import { Document } from '@contentful/rich-text-types';

export type Post = {
  title: string;
  slug: string;
  shortSummary: string;
  summary: Document;
  summaryImage: any;
  publishDate: string;
};
