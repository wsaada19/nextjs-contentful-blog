import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Navigation } from './Navigation';

export const siteTitle = 'Will Saadas porfolio and programming blog';

export default function Layout({ children, home }: { children: ReactNode; home?: boolean }) {
  return (
    <div className="mt-4 mx-auto mb-24 max-w-4xl px-8">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-8">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
