import Layout from 'components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { ContentfulRichTextRenderer } from 'components/ContentfulRichTextRenderer';
import { ContentfulImage, ProjectInfo } from '@types';
import Image from 'next/image';
import { contenfulLoader } from '@utilities';
import { ContentfulEntryType, getAssetById, getEntriesOfType } from '@services/contentful';

type ProjectPage = {
  project: ProjectInfo;
  image: ContentfulImage;
};

export default function Project({ project, image }: ProjectPage) {
  const { projectTitle, shortSummary, summary } = project;
  return (
    <Layout description={shortSummary} title={projectTitle}>
      <article className="md:px-8">
        <h1 className="text-4xl font-medium mb-6 text-center">{projectTitle}</h1>
        <div className="lg:mx-20">
          <Image
            src={`https://${image.file.url}`}
            alt={image.description}
            width={400}
            height={200}
            layout="responsive"
            loader={contenfulLoader}
          />
        </div>
        <div className="my-4">
          <ContentfulRichTextRenderer richText={summary} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.PROJECT);
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
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.PROJECT);
  const project = projectContentfulData.items.find((item) => {
    return item.fields.slug == params.projectSlug;
  });

  const image = await getAssetById(project.fields.summaryImage.sys.id);
  return {
    props: {
      project: project.fields,
      image: image.fields,
    },
  };
};
