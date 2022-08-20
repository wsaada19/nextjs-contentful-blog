import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { LinkCard } from '@components/Card';
import { GetStaticProps } from 'next';
import Layout from '@components/layouts/PageLayout';
import { ProjectInfo } from '@types';
import React from 'react';
import { sortBy } from '@utilities';

type ShowcasePageProps = {
  projects: ProjectInfo[];
};

export default function ProjectShowcase({ projects }: ShowcasePageProps) {
  return (
    <Layout description="List of my projects" title="Portfolio">
      <h1 className="mb-6 text-center md:text-left">Portfolio</h1>
      <ul className="list-none">
        {projects.map(({ projectTitle, slug, shortSummary, color }) => (
          <li key={slug}>
            <LinkCard
              href={`/portfolio/${slug}`}
              className={`text-xl mb-2 block text-white ${color ?? 'bg-blue-700'} text-white mb-4`}
            >
              {projectTitle}
              <p className="text-sm">{shortSummary}</p>
            </LinkCard>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulContentType.Project);
  const projects = sortBy<ProjectInfo>(
    (project) => project.weight,
    projectContentfulData.items.map((item) => item.fields)
  );

  return {
    props: {
      projects,
    },
  };
};
