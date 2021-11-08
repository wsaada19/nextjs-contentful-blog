import React from 'react';
import { BLOCKS, MARKS, Document, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GistCode } from './GistCode';

const Bold = ({ children }) => <span className="bold">{children}</span>;

const options: any = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="text-base py-1">{children}</p>,
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="text-xl font-medium my-3">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="text-lg font-medium my-3">{children}</h4>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      if (node.data.uri.includes('api.github.com') && node.content[0].value) {
        return <GistCode gistId={node.data.uri} fileName={node.content[0].value} />;
      }
      return (
        <a href={node.data.uri} className="underline">
          {children}
        </a>
      );
    },
  },
};

type ContentfulRichTextRendererProps = {
  richText: Document;
};

export const ContentfulRichTextRenderer = ({ richText }: ContentfulRichTextRendererProps) => {
  return <>{documentToReactComponents(richText, options)}</>;
};
