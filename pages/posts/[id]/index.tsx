import { ContentfulContentType, getAssetById, getEntriesOfType } from '@services/contentful';
import { ContentfulImage, PostLayoutProps } from '@types';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { PostLayout } from '@components/layouts/PostLayout';

export default function Project(props: PostLayoutProps) {
  return <PostLayout {...props} />;
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
  const blogPost = projectContentfulData.items.find((item) => {
    return item.fields.slug == params.id;
  });
  let image: { fields: ContentfulImage };
  if (blogPost.fields.summaryImage) {
    image = await getAssetById(blogPost.fields.summaryImage.sys.id);
  }
  return {
    props: {
      post: blogPost.fields,
      image: image ? image.fields : {},
      includedEntries: projectContentfulData.includes?.Entry ?? [],
    },
  };
};
