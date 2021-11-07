import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';
import { About } from '../components/About';
import { getEntriesOfType } from '../services/contentfulService';
import { Post } from '../types/posts';
import React from 'react';
import ReactEmbededGist from 'react-embed-gist';
import { GistCode } from '../components/GistCode';

type HomeProps = {
  allPostsData: Post[];
};

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <About />
      <section>
        <h2 className="text-xl font-bold mb-2">Blog</h2>
        <ul className="">
          {allPostsData.map(({ title, publishDate, slug }) => (
            <li className="mb-4" key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="">
                <Date dateString={publishDate} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postContentfulData = await getEntriesOfType('post');
  const posts = postContentfulData.items.map((item) => item.fields);
  return {
    props: {
      allPostsData: posts,
    },
  };
};
