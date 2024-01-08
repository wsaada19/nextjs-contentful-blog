import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { LinkCard } from '@components/Card';
import { Date } from '@components/Date';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@components/layouts/PageLayout';
import { PageData, Post } from '@types';
import React from 'react';
import { sortBy } from '@utilities';

type BlogProps = {
  posts: Post[];
  page: PageData;
};

export default function BlogPosts({ posts, page }: BlogProps) {
  const { heading, title, description } = page;
  return (
    <Layout description={description} title={title}>
      <h1 className="mb-3">{heading}</h1>
      <ul className="list-none">
        {posts.map(({ title, slug, publishDate, shortSummary, color, category }) => (
          <li key={title}>
            <LinkCard
              href={`/${category}/${slug}`}
              className={`text-xl block border-2 $'text-white border-gray-200 text-white mb-6 ${
                color ?? 'bg-blue-600'
              }`}
            >
              <div className="font-semibold">{title}</div>
              <p
                className={`pt-1 text-sm ${color ? 'text-white' : 'text-gray-700'}dark:text-white`}
              >
                {shortSummary}
              </p>
              <Date dateString={publishDate} />
            </LinkCard>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ['blog', 'portfolio'];
  const paths = categories.map((category) => {
    return {
      params: {
        category,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const contentfulPosts = await getEntriesOfType<Post>(ContentfulContentType.Post);
  const pageData = await getEntriesOfType<PageData>(ContentfulContentType.PageData);
  const page = pageData.items.find((data) => data.pageId === params.category);
  let posts = contentfulPosts.items.filter((post) => {
    return post.category === params.category;
  });
  posts = sortBy<Post>((p) => p.publishDate, posts);
  return {
    props: {
      posts,
      page,
    },
  };
};
