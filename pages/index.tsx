import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { HomePage, Post, ProjectInfo } from '@types';
import { About } from '@components/About';
import { LinkCard } from '@components/Card';
import { Date } from '@components/Date';
import { GetStaticProps } from 'next';
import Layout from '@components/Layout';
import React from 'react';
import { sortBy } from '@utilities';

type HomeProps = {
  allPostsData: Post[];
  homePageData: HomePage;
  projects: ProjectInfo[];
};

export default function Home({ allPostsData, homePageData, projects }: HomeProps) {
  const { name, about, pageDescription, pageTitle } = homePageData;
  return (
    <Layout description={pageDescription} title={`${name} | ${pageTitle}`}>
      <h1 className="mb-2 text-center md:text-left">{name}</h1>
      <About aboutText={about} />
      <section>
        <h2 className="mb-3">Blog</h2>
        <ul>
          {allPostsData.map(({ title, publishDate, slug }) => (
            <li key={slug}>
              <LinkCard
                className="mb-4 dark:bg-blue-700 dark:text-white border-4"
                href={`/posts/${slug}`}
              >
                {title}
                <br />
                <Date dateString={publishDate} />
              </LinkCard>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mt-5 mb-3">Projects</h2>
        <ul className="flex justify-start flex-wrap lg:justify-between">
          {projects.map(({ projectTitle, slug, color }) => (
            <li className="w-full text-center mb-4 md:mr-2 md:w-auto md:text-left" key={slug}>
              <LinkCard
                className={` text-white md:text-leftmb-4 ${color ?? 'bg-blue-600'}`}
                href={`/portfolio/${slug}`}
              >
                {projectTitle}
              </LinkCard>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postContentfulData = await getEntriesOfType(ContentfulContentType.Post);
  const posts = postContentfulData.items.map((item) => item.fields);

  const projectContentfulData = await getEntriesOfType(ContentfulContentType.Project);
  const projects = sortBy<ProjectInfo>(
    (project) => project.weight,
    projectContentfulData.items.map((item) => item.fields)
  );

  const homePage = await getEntriesOfType(ContentfulContentType.HomePage);

  return {
    props: {
      allPostsData: posts,
      homePageData: homePage.items[0].fields,
      projects,
    },
  };
};
