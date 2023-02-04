/* eslint-disable @typescript-eslint/no-explicit-any */
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { atomOneDark, CodeBlock } from 'react-code-blocks';
import { ContentfulContentType } from '@services/contentful';
import { D3GraphContainer } from 'graphs/D3GraphContainer';

const options = (linkedEntries): any => ({
  renderMark: {
    [MARKS.BOLD]: (text) => <span className="font-medium">{text}</span>,
    [MARKS.CODE]: (text) => (
      <code className="break-words text-yellow-700 font-semibold">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="text-base py-1">{children}</p>,
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="my-1 text-blue-800">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="my-1 text-blue-800">{children}</h4>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <a className="hover:underline dark:text-blue-400" href={node.data.uri}>
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { id } = node.data.target.sys;
      const entry = linkedEntries.find((entry) => entry.sys.id === id);
      if (entry) {
        if (entry.sys.contentType.sys.id === ContentfulContentType.CodeSnippet) {
          return (
            <div className="my-3">
              <CodeBlock
                text={entry.fields.codeBlock}
                language={entry.fields.language}
                showLineNumbers={false}
                theme={atomOneDark}
              />
            </div>
          );
        } else if (entry.sys.contentType.sys.id === ContentfulContentType.D3Graph) {
          return <D3GraphContainer graphId={entry.fields.graphId} />;
        }
      }
    },
  },
});

type ContentfulRichTextRendererProps = {
  richText: Document;
  includedEntries?: any[];
};

export const ContentfulRichTextRenderer = ({
  richText,
  includedEntries = [],
}: ContentfulRichTextRendererProps) => {
  return (
    <div className="my-2">{documentToReactComponents(richText, options(includedEntries))}</div>
  );
};
