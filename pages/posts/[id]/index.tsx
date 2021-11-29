import Layout from 'components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { ContentfulRichTextRenderer } from 'components/ContentfulRichTextRenderer';
import { Post, ContentfulImage } from '@types';
import { ContentfulEntryType, getAssetById, getEntriesOfType } from '@services/contentful';
import { HeroBanner } from 'components/HeroBanner';

type ProjectPage = {
  post: Post;
  image: ContentfulImage;
};

export default function Project({ post, image }: ProjectPage) {
  const { title, shortSummary, summary } = post;
  return (
    <Layout description={shortSummary} title={title}>
      <article className="md:px-8">
        <HeroBanner title={title} image={image} summary={shortSummary} />
        <div className="my-4">
          <ContentfulRichTextRenderer richText={summary} />
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
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
  const projectContentfulData = await getEntriesOfType(ContentfulEntryType.POST);
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
