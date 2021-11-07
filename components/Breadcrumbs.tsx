// breadcrumbs component for nextjs blog site
import React from 'react';

// BreadcrumbsProps interface
interface BreadcrumbsProps {
  crumbs: string[];
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
