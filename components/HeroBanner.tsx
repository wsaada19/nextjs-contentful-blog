import { ContentfulImage } from '@types';
import Image from 'next/image';
import React from 'react';
import { contentfulLoader } from '@utilities';

type HeroBannerProps = {
  title: string;
  image?: ContentfulImage;
  summary: string;
};

export const HeroBanner = ({ title, image, summary }: HeroBannerProps) => {
  const getImage = (): JSX.Element => {
    if (image.file) {
      const { width, height } = image.file.details.image;
      return (
        <>
          <Image
            src={`https://${image.file.url}`}
            alt={image.description}
            width={width}
            height={height}
            layout="responsive"
            loader={contentfulLoader}
            priority
          />
          <h2 className="text-sm font-normal mt-2 text-black font-sans dark:text-white">
            {summary}
          </h2>
        </>
      );
    }
  };
  return (
    <>
      <h1 className="mb-7 text-center">{title}</h1>
      {getImage()}
    </>
  );
};
