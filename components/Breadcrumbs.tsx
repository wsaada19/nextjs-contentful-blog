import { BreadcrumbsLd } from './schema/BreadcrumbsLd';
import { LinkType } from '@types';
import React from 'react';
import Link from 'next/link';

export type BreadcrumbsProps = {
  crumbs: LinkType[];
};

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <>
      <BreadcrumbsLd crumbs={crumbs} />
      <div className="mb-4">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <Link href={crumb.href} key={crumb.label}>
              <a className={`${isLast ? 'text-gray-400 cursor-default pointer-events-none' : ''}`}>
                {crumb.label}
                <span className="text-gray-400 px-1">{isLast ? '' : ' / '}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};
