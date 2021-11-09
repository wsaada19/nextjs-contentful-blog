import React from 'react';
import { Link } from '../types/link';

interface BreadcrumbsProps {
  crumbs: Link[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <div>
      {crumbs.map((crumb, index) => {
        return (
          <a href={crumb.href} key={crumb.label}>
            {crumb.label}
            {index < crumbs.length - 1 ? ' > ' : ''}
          </a>
        );
      })}
    </div>
  );
};
