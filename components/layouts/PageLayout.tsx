import React, { ReactNode } from 'react';
import { Footer } from '../Footer';
import Head from 'next/head';
import { Navigation } from '../Navigation';

type LayoutProps = {
  children: ReactNode;
  description: string;
  title: string;
  hideLinks?: boolean;
};

export default function PageLayout({
  children,
  description,
  title,
  hideLinks = false,
}: LayoutProps) {
  return (
    <div className="dark:bg-blue-900 dark:text-white min-h-full">
      <div className="pt-4 mx-auto pb-8 max-w-4xl px-4 md:px-8">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content={description} />
          <meta name="og:title" content={title} />
          <meta name="og:image" content="/favicon.png" />
          <meta
            name="google-site-verification"
            content="6vJhvAxISHZIcwJgzmbpHGvL6Op6sxHxJoNuyJWMIlw"
          />
        </Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if (
              localStorage.theme === 'dark' ||
              (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
              {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }`,
          }}
        ></script>
        <header>
          <Navigation hideLinks={hideLinks} />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
