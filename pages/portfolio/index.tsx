import { ContentfulEntryType, getEntriesOfType } from '@services/contentful';

import { Card } from '@components/Card';
import { GetStaticProps } from 'next';
import Layout from '@components/Layout';
import Link from 'next/link';
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
            <Card className={`${color ?? 'bg-blue-700'} text-white mb-4`}>
              <Link href={`/portfolio/${slug}`}>
                <a className="text-xl mb-2 block text-white">{projectTitle}</a>
              </Link>
              <p className="text-sm">{shortSummary}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.Project);
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
