import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types';

import { GistCode } from './GistCode';
import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const options: any = {
  renderMark: {
    [MARKS.BOLD]: (text) => <span className="bold">{text}</span>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="text-lg py-2">{children}</p>,
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="my-3">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return <h4 className="my-3">{children}</h4>;
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
  },
};

type ContentfulRichTextRendererProps = {
  richText: Document;
};

export const ContentfulRichTextRenderer = ({ richText }: ContentfulRichTextRendererProps) => {
  return <div className="my-4">{documentToReactComponents(richText, options)}</div>;
};
