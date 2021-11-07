import { Document } from '@contentful/rich-text-types';

export type ProjectInfo = {
  projectTitle: string;
  slug: string;
  shortSummary: string;
  summary: Document;
  link: string;
  summaryImage: any;
  publishDate: string;
};
