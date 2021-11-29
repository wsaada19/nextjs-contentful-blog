import Layout from 'components/Layout';
import { GetStaticProps } from 'next';
import { ProjectInfo } from '@types';
import React from 'react';
import Link from 'next/link';
import { getEntriesOfType, ContentfulEntryType } from '@services/contentful';
import { Card } from 'components/Card';
import { sortBy } from '@utilities';
import { Typography } from 'components/Typography';

type ShowcasePageProps = {
  projects: ProjectInfo[];
};

export default function ProjectShowcase({ projects }: ShowcasePageProps) {
  return (
    <Layout description="List of my projects" title="Portfolio">
      <Typography className="mb-6 text-center md:text-left" type="h1">
        Portfolio
      </Typography>
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
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.PROJECT);
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
