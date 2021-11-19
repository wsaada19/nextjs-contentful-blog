import React from 'react';
import { Link } from '@types';

interface BreadcrumbsProps {
  crumbs: Link[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <a
            className={isLast ? 'text-gray-400' : 'text-black'}
            href={crumb.href}
            key={crumb.label}
          >
            {crumb.label}
            <span className="hover:no-underline">{isLast ? '' : ' / '}</span>
          </a>
        );
      })}
    </>
  );
};
