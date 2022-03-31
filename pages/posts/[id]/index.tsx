import { ContentfulContentType, getAssetById, getEntriesOfType } from '@services/contentful';
import { ContentfulImage, Post } from '@types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ContentfulRichTextRenderer } from '@components/ContentfulRichTextRenderer';
import { HeroBanner } from '@components/HeroBanner';
import Layout from '@components/Layout';
import React from 'react';
import { ArticleLd } from '@components/schema/ArticleLd';

type ProjectPage = {
  post: Post;
  image: ContentfulImage;
  includedEntries: any[];
};

export default function Project({ post, image, includedEntries }: ProjectPage) {
  const { title, shortSummary, summary, publishDate } = post;
  return (
    <Layout description={shortSummary} title={title} hideLinks>
      <ArticleLd description={shortSummary} title={title} datePublished={publishDate} />
      <article className="md:px-8">
        <Breadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Posts', href: '/posts' },
            { label: post.title, href: post.slug },
          ]}
        />
        <HeroBanner title={title} image={image} summary={shortSummary} />
        <ContentfulRichTextRenderer richText={summary} includedEntries={includedEntries} />
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
      includedEntries: projectContentfulData.includes.Entry,
    },
  };
};
