import { ContentfulContentType, getAssetById, getEntriesOfType } from '@services/contentful';
import { ContentfulImage, Post } from '@types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ContentfulRichTextRenderer } from '@components/ContentfulRichTextRenderer';
import { HeroBanner } from '@components/HeroBanner';
import Layout from '@components/Layout';
import React from 'react';

type ProjectPage = {
  post: Post;
  image: ContentfulImage;
};

export default function Project({ post, image }: ProjectPage) {
  const { title, shortSummary, summary } = post;
  return (
    <Layout description={shortSummary} title={title} hideLinks>
      <article className="md:px-8">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Posts', href: '/posts' },
            { label: post.title, href: post.slug },
          ]}
        />
        <HeroBanner title={title} image={image} summary={shortSummary} />
        <ContentfulRichTextRenderer richText={summary} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projectContentfulData = await getEntriesOfType(ContentfulContentType.Post);
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
  const projectContentfulData = await getEntriesOfType(ContentfulContentType.Post);
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
