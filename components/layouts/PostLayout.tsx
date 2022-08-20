import { Breadcrumbs } from '@components/Breadcrumbs';
import { ContentfulRichTextRenderer } from '@components/ContentfulRichTextRenderer';
import { HeroBanner } from '@components/HeroBanner';
import PageLayout from '@components/layouts/PageLayout';
import { ArticleLd } from '@components/schema/ArticleLd';
import { PostLayoutProps } from '@types';
import React from 'react';

export const PostLayout = ({ post, image, includedEntries }: PostLayoutProps) => {
  const { title, shortSummary, summary, publishDate } = post;
  return (
    <PageLayout description={shortSummary} title={title} hideLinks>
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
    </PageLayout>
  );
};
