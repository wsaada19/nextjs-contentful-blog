import React from 'react';
import { Link } from '../types/link';

interface BreadcrumbsProps {
  crumbs: Link[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <div className="">
      {crumbs.map((crumb, index) => {
        return (
          <span key={index}>
            {crumb}
            {index < crumbs.length - 1 ? ' > ' : ''}
          </span>
        );
      })}
    </div>
  );
};
