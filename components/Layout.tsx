import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Navigation } from './Navigation';

export const siteTitle = 'Will Saadas porfolio and programming blog';

type LayoutProps = {
  children: ReactNode;
  home?: boolean;
  description: string;
};

export default function Layout({ children, home, description }: LayoutProps) {
  return (
    <div className="mt-4 mx-auto mb-24 max-w-4xl px-6 md:px-8">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={description} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-8 text-base">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
