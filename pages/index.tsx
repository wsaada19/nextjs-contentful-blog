import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import Link from 'next/link';
import { Date } from '../components/Date';
import { GetStaticProps } from 'next';
import { About } from '../components/About';
import { getEntriesOfType } from '../services/contentfulService';
import { Post } from '../types/posts';
import React from 'react';
import { HomePage } from '../types/homePage';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
};

export default function Home({ allPostsData, homePageData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className="text-3xl font-bold mb-2">{homePageData.name}</h1>
      <About aboutText={homePageData.about} />
      <section>
        <h2 className="text-xl font-bold mb-2">Blog</h2>
        <ul className="">
          {allPostsData.map(({ title, publishDate, slug }) => (
            <li className="mb-4 shadow-md p-3 rounded-lg border border-gray-300" key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
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
  const homePage = await getEntriesOfType('homePage');
  const posts = postContentfulData.items.map((item) => item.fields);
  return {
    props: {
      allPostsData: posts,
      homePageData: homePage.items[0].fields,
    },
  };
};
