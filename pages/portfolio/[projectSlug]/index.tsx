import { ContentfulEntryType, getAssetById, getEntriesOfType } from '@services/contentful';
import { ContentfulImage, ProjectInfo } from '@types';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ContentfulRichTextRenderer } from 'components/ContentfulRichTextRenderer';
import { HeroBanner } from 'components/HeroBanner';
import Layout from 'components/Layout';
import React from 'react';

type ProjectPage = {
  project: ProjectInfo;
  image: ContentfulImage;
};

export default function Project({ project, image }: ProjectPage) {
  const { projectTitle, shortSummary, summary } = project;
  return (
    <Layout description={shortSummary} title={projectTitle}>
      <article className="md:px-8">
        <HeroBanner title={projectTitle} image={image} summary={shortSummary} />
        <ContentfulRichTextRenderer richText={summary} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.Project);
  const paths = projectContentfulData.items.map((item) => {
    return {
      params: {
        projectSlug: item.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.Project);
  const project = projectContentfulData.items.find(
    (item) => item.fields.slug == params.projectSlug
  );

  const image = await getAssetById(project.fields.summaryImage.sys.id);
  return {
    props: {
      project: project.fields,
      image: image.fields,
    },
  };
};
