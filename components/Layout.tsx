import Head from 'next/head';
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
        <meta name="og:image" content="/favicon.png" />
      </Head>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <div className="mt-4 text-base">
        <hr className="border-gray-300 mb-2" />
        <a className="text-sm" href="https://github.com/wsaada19/nextjs-contentful-blog">
          View source code on GitHub →
        </a>
      </div>
    </div>
  );
}
