import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { LinkCard } from '@components/Card';
import { Date } from '@components/Date';
import { GetStaticProps } from 'next';
import Layout from '@components/Layout';
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
            <LinkCard
              href={`/posts/${slug}`}
              className="text-xl block dark:text-white mb-6 dark:bg-blue-700"
            >
              {title}
              <p className=" pt-1 text-sm text-gray-700 dark:text-white">{shortSummary}</p>
              <Date dateString={publishDate} />
            </LinkCard>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const contentfulPosts = await getEntriesOfType(ContentfulContentType.Post);
  const posts = contentfulPosts.items.map((item) => item.fields);
  return {
    props: {
      posts,
    },
  };
};
