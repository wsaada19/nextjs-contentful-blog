import Link from 'next/link';
import React from 'react';
import { Switch } from './switch';

type NavigationProps = {
  hideLinks: boolean;
};

export const Navigation = ({ hideLinks = false }: NavigationProps) => {
  return (
    <nav className="mt-2 mb-4 text-base h-6">
      {!hideLinks && (
        <>
          <Link href="/" className="mr-2 md:mr-4">
            Home
          </Link>
          <Link href="/blog" className="mx-2 md:mx-4">
            Blog
          </Link>
          <Link href="/portfolio" className="ml-2 md:mx-4">
            Portfolio
          </Link>
        </>
      )}
      <span className="sm:block float-right">
        <Switch className="px-2" />
      </span>
    </nav>
  );
};
