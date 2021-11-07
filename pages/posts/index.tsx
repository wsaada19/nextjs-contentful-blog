import Layout from '../../components/Layout';
import Head from 'next/head';
import Date from '../../components/date';
import { GetStaticProps } from 'next';
import { Post } from '../../types/posts';
import React from 'react';
import Link from 'next/link';
import { getEntriesOfType } from '../../services/contentfulService';

type ShowcasePageProps = {
  projects: Post[];
};

export default function BlogPosts({ projects }: ShowcasePageProps) {
  return (
    <Layout>
      <Head>
        <title>Project Showcase</title>
      </Head>
      <article>
        <h1 className="text-4xl font-bold mb-6">Projects</h1>
        <ul className="list-none">
          {projects.map(({ title, slug, publishDate, shortSummary }) => (
            <li className="mb-4" key={slug}>
              <Link href={`/posts/${slug}`}>
                <a className="text-xl mb-2 block">{title}</a>
              </Link>
              <p className="text-sm">{shortSummary}</p>
              <small className="text-xsm italic">
                <Date dateString={publishDate} />
              </small>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projectContentfulData = await getEntriesOfType('post');
  const projects = projectContentfulData.items.map((item) => item.fields);
  return {
    props: {
      projects,
    },
  };
};
