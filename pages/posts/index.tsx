import Layout from 'components/Layout';
import { Date } from 'components/Date';
import { GetStaticProps } from 'next';
import { Post } from '@types';
import React from 'react';
import Link from 'next/link';
import { getEntriesOfType, ContentfulEntryType } from '@services/contentful';
import { Card } from 'components/Card';

type BlogProps = {
  posts: Post[];
};

export default function BlogPosts({ posts }: BlogProps) {
  return (
    <Layout
      description="List of all my blog posts"
      title="Blog posts about programming and technology!"
    >
      <article>
        <h1 className="text-3xl font-semibold mb-6 text-center md:text-left">My Blog Posts</h1>
        <ul className="list-none">
          {posts.map(({ title, slug, publishDate, shortSummary }) => (
            <li key={title}>
              <Card className="cursor-pointer mb-4">
                <Link href={`/posts/${slug}`}>
                  <a className="text-xl mb-2 block">{title}</a>
                </Link>
                <p className="text-sm">{shortSummary}</p>
                <Date dateString={publishDate} />
              </Card>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contentfulPosts = await getEntriesOfType(ContentfulEntryType.POST);
  const posts = contentfulPosts.items.map((item) => item.fields);
  return {
    props: {
      posts,
    },
  };
};
