import Layout from 'components/Layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { ContentfulRichTextRenderer } from 'components/ContentfulRichTextRenderer';
import Image from 'next/image';
import { Post, ContentfulImage } from '@types';
import { contenfulLoader } from '@utilities';
import { ContentfulEntryType, getAssetById, getEntriesOfType } from '@services/contentful';
import { Breadcrumbs } from 'components/Breadcrumbs';

type ProjectPage = {
  post: Post;
  image: ContentfulImage;
};

export default function Project({ post, image }: ProjectPage) {
  const { title, shortSummary, summaryImage, summary, slug } = post;
  return (
    <Layout description={shortSummary} title={title}>
      <article className="md:px-8">
        {/* <Breadcrumbs
          crumbs={[
            { href: '/', label: 'home' },
            { href: '/posts', label: 'blog' },
            { href: `/posts/${slug}`, label: slug },
          ]}
        /> */}
        <h1 className="text-4xl font-medium mb-6 text-center md:px-8 md:text-4xl">{title}</h1>
        {/* <h2 className="text-lg font-normal">{shortSummary}</h2> */}
        {summaryImage && (
          <div className="lg:mx-20">
            <Image
              src={`https://${image.file.url}`}
              alt={image.description}
              width={400}
              height={250}
              layout="responsive"
              loader={contenfulLoader}
            />
          </div>
        )}
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
