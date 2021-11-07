import Head from 'next/head';
import styles from './layout.module.css';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Navigation } from './Navigation';

const name = 'Will Saada';
export const siteTitle = 'Will Saadas porfolio and programming blog';

export default function Layout({ children, home }: { children: ReactNode; home?: boolean }) {
  return (
    <div className={`${styles.container} max-w-4xl px-8`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <Navigation />
        {home && <h1 className="text-3xl font-bold mb-2">{name}</h1>}
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
