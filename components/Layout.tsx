import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Navigation } from './Navigation';

export const siteTitle = 'Will Saadas porfolio and programming blog';

type LayoutProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export default function Layout({ children, description, title }: LayoutProps) {
  return (
    <div className="mt-4 mx-auto mb-8 max-w-4xl px-6 md:px-8">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={description} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <div className="mt-6 text-base">
        <a className="text-sm" href="https://github.com/wsaada19/nextjs-contentful-blog">
          View source code
        </a>
      </div>
    </div>
  );
}
