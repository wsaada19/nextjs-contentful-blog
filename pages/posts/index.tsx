import { ContentfulEntryType, getEntriesOfType } from '@services/contentful';

import { Card } from '@components/Card';
import { Date } from '@components/Date';
import { GetStaticProps } from 'next';
import Layout from '@components/Layout';
import Link from 'next/link';
import { Post } from '@types';
import React from 'react';

type BlogProps = {
  posts: Post[];
};

export default function BlogPosts({ posts }: BlogProps) {
  return (
    <Layout
      description="List of all my blog posts"
      title="Blog posts about programming and technology!"
    >
      <h1 className="mb-6 text-center md:text-left">Blog posts</h1>
      <ul className="list-none">
        {posts.map(({ title, slug, publishDate, shortSummary }) => (
          <li key={title}>
            <Link href={`/posts/${slug}`}>
              <a className="text-xl mb-2 block dark:text-white">
                <Card className="mb-4 dark:bg-blue-700">
                  {title}
                  <p className="text-sm">{shortSummary}</p>
                  <Date dateString={publishDate} />
                </Card>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contentfulPosts = await getEntriesOfType(ContentfulEntryType.Post);
  const posts = contentfulPosts.items.map((item) => item.fields);
  return {
    props: {
      posts,
    },
  };
};
