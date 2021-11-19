import Layout, { siteTitle } from '../components/Layout';
import Link from 'next/link';
import { Date } from 'components/Date';
import { GetStaticProps } from 'next';
import { About } from 'components/About';
import React from 'react';
import { HomePage, ProjectInfo, Post } from '@types';
import { ContentfulEntryType, getEntriesOfType } from '@services/contentful';
import { sortBy } from '@utilities';
import { Card } from 'components/Card';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
  projects: ProjectInfo[];
};

export default function Home({ allPostsData, homePageData, projects }: HomeProps) {
  const { name, about } = homePageData;
  return (
    <Layout description={`${name}'s blog and personal website'`} title={siteTitle}>
      <h1 className="text-4xl mb-2 font-semibold text-center md:text-left">{name}</h1>
      <About aboutText={about} />
      <section>
        <h2 className="text-2xl font-semibold mb-3">Blog</h2>
        <ul>
          {allPostsData.map(({ title, publishDate, slug }) => (
            <li key={slug}>
              <Card className="mb-4">
                <Link href={`/posts/${slug}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <Date dateString={publishDate} />
              </Card>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-3">Projects</h2>
        <ul className="flex justify-start flex-wrap lg:justify-between">
          {projects.map(({ projectTitle, slug }) => (
            <li className="w-full text-center mr-2 md:w-auto md:text-left" key={slug}>
              <Card className="mb-4 bg-blue-700">
                <a className="text-white md:text-left" href={`/portfolio/${slug}`}>
                  {projectTitle}
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
  const posts = postContentfulData.items.map((item) => item.fields);

  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.PROJECT);
  const projects = sortBy<ProjectInfo>(
    (project) => project.weight,
    projectContentfulData.items.map((item) => item.fields)
  );

  const homePage = await getEntriesOfType(ContentfulEntryType.HOME_PAGE);

  return {
    props: {
      allPostsData: posts,
      homePageData: homePage.items[0].fields,
      projects,
    },
  };
};
