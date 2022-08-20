import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';
import { GistCode } from './GistCode';
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { atomOneDark, CodeBlock } from 'react-code-blocks';
import { ContentfulContentType } from '@services/contentful';

const options = (linkedEntries): any => ({
  renderMark: {
    [MARKS.BOLD]: (text) => <span className="font-semibold">{text}</span>,
    [MARKS.CODE]: (text) => <code className="break-words">{text}</code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="text-lg py-2">{children}</p>,
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="my-2 text-blue-800">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="my-2 text-blue-800">{children}</h4>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      if (node.data.uri.includes('api.github.com') && node.content[0].value) {
        return <GistCode gistId={node.data.uri} fileName={node.content[0].value} />;
      }
      return (
        <a className="hover:underline" href={node.data.uri}>
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
            <>
              {/* <div className="mt-4  border border-gray-400 rounded-sm shadow-md">
                Copy
              </div> */}
              <CodeBlock
                className="mb-4"
                text={entry.fields.codeBlock}
                language={entry.fields.language}
                showLineNumbers={false}
                theme={atomOneDark}
              />
            </>
          );
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
    <div className="my-4">{documentToReactComponents(richText, options(includedEntries))}</div>
  );
};
