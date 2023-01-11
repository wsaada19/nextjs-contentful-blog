import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { HomePage, Post } from '@types';
import { About } from '@components/About';
import { LinkCard } from '@components/Card';
import { Date } from '@components/Date';
import { GetStaticProps } from 'next';
import Layout from '@components/layouts/PageLayout';
import React from 'react';
import { sortBy } from '@utilities';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
  projects: Post[];
};

export default function Home({ allPostsData, homePageData, projects }: HomeProps) {
  const { name, about, pageDescription, pageTitle } = homePageData;
  return (
    <Layout description={pageDescription} title={`${name} | ${pageTitle}`}>
      <h1 className="mb-2">{name}</h1>
      <About aboutText={about} />
      <section>
        <h2 className="mb-3">Blog</h2>
        <ul>
          {allPostsData.splice(0, 3).map(({ title, publishDate, slug, category }) => (
            <li key={slug}>
              <LinkCard
                className="mb-4 border-2 bg-blue-50 border-blue-500 text-blue-500 dark:bg-blue-700 dark:text-white"
                href={`/${category}/${slug}`}
              >
                <div className="font-semibold">{title}</div>
                <Date dateString={publishDate} />
              </LinkCard>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mt-5 mb-3">Projects</h2>
        <ul className="flex justify-start flex-wrap lg:justify-between">
          {projects.map(({ title, slug, color }) => (
            <li className="w-full text-center mb-4 mr-2 md:w-auto md:text-left" key={slug}>
              <LinkCard
                className={`text-white md:text-left ${color ?? 'bg-blue-600'}`}
                href={`/portfolio/${slug}`}
              >
                <div className="font-semibold">{title}</div>
              </LinkCard>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getEntriesOfType<Post>(ContentfulContentType.Post);
  const homePage = await getEntriesOfType<HomePage>(ContentfulContentType.HomePage);

  return {
    props: {
      allPostsData: sortBy<Post>(
        (p) => p.publishDate,
        posts.items.filter((post) => post.category === 'blog')
      ),
      homePageData: homePage.items[0],
      projects: posts.items.filter((post) => post.category === 'portfolio'),
    },
  };
};
