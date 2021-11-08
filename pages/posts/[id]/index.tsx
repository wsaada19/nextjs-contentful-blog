import Layout from '../../../components/Layout';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { getAssetById, getEntriesOfType } from '../../../services/contentfulService';
import { ContentfulRichTextRenderer } from '../../../components/ContentfulRichTextRenderer';
import { ContentfulImage } from '../../../types/contentful';
import Image from 'next/image';
import { Post } from '../../../types/posts';

type ProjectPage = {
  post: Post;
  image: ContentfulImage;
};

export default function Project({ post, image }: ProjectPage) {
  const { title, shortSummary, publishDate, summaryImage, summary } = post;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="description" content={shortSummary}></meta>
      </Head>
      <article className="px-4">
        <h1 className="text-4xl font-medium mb-6 text-center px-12">{title}</h1>
        {summaryImage && (
          <Image
            src={`https://${image.file.url}`}
            alt={image.description}
            width={500}
            height={250}
            layout="responsive"
          />
        )}
        <div className="my-4">
          <ContentfulRichTextRenderer richText={summary} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType('post');
  const paths = projectContentfulData.items.map((item) => {
    return {
      params: {
        id: item.fields.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectContentfulData = await getEntriesOfType('post');
  const project = projectContentfulData.items.find((item) => {
    return item.fields.slug == params.id;
  });
  let image: { fields: ContentfulImage };
  if (project.fields.summaryImage) {
    image = await getAssetById(project.fields.summaryImage.sys.id);
  }
  return {
    props: {
      post: project.fields,
      image: image ? image.fields : {},
    },
  };
};
