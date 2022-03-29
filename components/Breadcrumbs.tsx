import { BreadcrumbsLd } from './schema/BreadcrumbsLd';
import { Link } from '@types';
import React from 'react';

export interface BreadcrumbsProps {
  crumbs: Link[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <>
      <BreadcrumbsLd crumbs={crumbs} />
      <div className="mb-4">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <a
              className={`${
                isLast
                  ? 'text-gray-400 cursor-default pointer-events-none'
                  : 'text-black dark:text-white'
              }`}
              href={crumb.href}
              key={crumb.label}
            >
              {crumb.label}
              <span className="text-gray-400">{isLast ? '' : ' / '}</span>
            </a>
          );
        })}
      </div>
    </>
  );
};
