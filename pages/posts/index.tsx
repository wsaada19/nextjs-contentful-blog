import Layout from '../../components/Layout';
import Head from 'next/head';
import { Date } from '../../components/Date';
import { GetStaticProps } from 'next';
import { Post } from '@types';
import React from 'react';
import Link from 'next/link';
import { getEntriesOfType } from '../../services/contentful/contentfulService';
import { ContentfulEntryType } from '../../services/contentful/contentfulEntries';

type ShowcasePageProps = {
  projects: Post[];
};

export default function BlogPosts({ projects }: ShowcasePageProps) {
  return (
    <Layout description="List of all my blog posts">
      <Head>
        <title>All Blog Posts</title>
      </Head>
      <article>
        <h1 className="text-3xl font-semibold mb-6">My Blog Posts</h1>
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
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
  const projects = projectContentfulData.items.map((item) => item.fields);
  return {
    props: {
      projects,
    },
  };
};
