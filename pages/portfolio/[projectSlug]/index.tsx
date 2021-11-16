import Layout from '../../../components/Layout';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ProjectInfo } from '../../../types/projects';
import React from 'react';
import { getAssetById, getEntriesOfType } from '../../../services/contentfulService';
import { ContentfulRichTextRenderer } from '../../../components/ContentfulRichTextRenderer';
import { ContentfulImage } from '../../../types/contentful';
import Image from 'next/image';
import { contenfulLoader } from '../../../utilities/loaders';

type ProjectPage = {
  project: ProjectInfo;
  image: ContentfulImage;
};

export default function Project({ project, image }: ProjectPage) {
  const { projectTitle, shortSummary, publishDate, summary } = project;
  return (
    <Layout>
      <Head>
        <title>{projectTitle}</title>
        <meta property="description" content={shortSummary}></meta>
      </Head>
      <article>
        <h1 className="text-4xl font-medium mb-6 text-center">{projectTitle}</h1>
        <Image
          src={`https://${image.file.url}`}
          alt={image.description}
          width={500}
          height={250}
          layout="responsive"
          loader={contenfulLoader}
        />
        <div className="my-4">
          <ContentfulRichTextRenderer richText={summary} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType('projectShowcase');
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
  const projectContentfulData = await getEntriesOfType('projectShowcase');
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
