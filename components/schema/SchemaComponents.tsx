import { BreadcrumbsProps } from '@components/Breadcrumbs';
import { ArticleLdProps } from '@types';
import { getArticleLd, getBreadcrumbsJsonLd } from './schemaBuilder';

const jsonLd = 'application/ld+json';

export const BreadcrumbsLd = ({ crumbs }: BreadcrumbsProps) => {
  return <script type={jsonLd}>{getBreadcrumbsJsonLd(crumbs)}</script>;
};

export const ArticleLd = (article: ArticleLdProps) => {
  return <script type={jsonLd}>{getArticleLd(article)}</script>;
};
