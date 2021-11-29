import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode, useEffect } from 'react';
import { Navigation } from './Navigation';

type LayoutProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export default function Layout({ children, description, title }: LayoutProps) {
  useEffect(() => {
    // TODO - make this toggleable
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return (
    <div className="dark:bg-blue-900 dark:text-white min-h-full">
      <div className="pt-4 mx-auto pb-8 max-w-4xl px-6 md:px-8">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content={description} />
          <meta name="og:title" content={title} />
          <meta name="og:image" content="/favicon.png" />
        </Head>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <div className="mt-6 text-base">
          <hr className="border-gray-300 mb-2" />
          <a className="text-sm" href="https://github.com/wsaada19/nextjs-contentful-blog">
            View source code
          </a>
          <Link href="/resume">
            <a className="text-sm pl-4">My resume</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
