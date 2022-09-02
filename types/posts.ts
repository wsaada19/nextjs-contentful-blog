import { Document } from '@contentful/rich-text-types';
import { ContentfulImage } from './contentful';

export type PostLayoutProps = {
  post: Post;
  image: ContentfulImage;
  includedEntries: any[];
};

export type Post = {
  title: string;
  slug: string;
  shortSummary: string;
  summary: Document;
  summaryImage: any;
  publishDate: string;
  color: string;
  category: string;
};
