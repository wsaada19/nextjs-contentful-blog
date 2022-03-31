import { Generic, JSONLD } from 'react-structured-data';
import { BreadcrumbsProps } from '@components/Breadcrumbs';

export const BreadcrumbsLd = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <JSONLD dangerouslyExposeHtml>
      <Generic
        type="BreadcrumbList"
        jsonldtype="BreadcrumbList"
        schema={{
          itemListElement: crumbs.map((crumb, index) => {
            return {
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@id': crumb.href,
                name: crumb.label,
              },
            };
          }),
        }}
      ></Generic>
    </JSONLD>
  );
};
