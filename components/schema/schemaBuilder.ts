import { ArticleLdProps, LinkType } from '@types';
const schema = 'https://schema.org';

export const getBreadcrumbsJsonLd = (crumbs: LinkType[]) => {
  const breadcrumbs = {
    '@context': schema,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => {
      return { '@type': 'ListItem', position: index + 1, name: crumb.label, item: crumb.href };
    }),
  };
  return JSON.stringify(breadcrumbs);
};

export const getArticleLd = ({ title, description, datePublished }: ArticleLdProps) => {
  const articleSchema = {
    '@context': schema,
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: datePublished,
  };
  return JSON.stringify(articleSchema);
};
