import { ArticleLdProps, LinkType } from '@types';

export const getBreadcrumbsJsonLd = (crumbs: LinkType[]) => {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => {
      return { '@type': 'ListItem', position: index + 1, name: crumb.label, item: crumb.href };
    }),
  };
  return JSON.stringify(breadcrumbs);
};

export const getArticleLd = (article: ArticleLdProps) => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
  };
  return JSON.stringify(articleSchema);
};
