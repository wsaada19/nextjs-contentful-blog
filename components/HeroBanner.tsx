import React from 'react';
import { Typography } from './Typography';
import Image from 'next/image';
import { contenfulLoader } from '@utilities';
import { ContentfulImage } from '@types';

type HeroBannerProps = {
  title: string;
  image?: ContentfulImage;
  summary: string;
};

export const HeroBanner = ({ title, image, summary }: HeroBannerProps) => {
  return (
    <>
      <Typography type="h1" className="mb-6 text-center">
        {title}
      </Typography>
      {image.file.url && (
        <Image
          src={`https://${image.file.url}`}
          alt={image.description}
          width={400}
          height={200}
          layout="responsive"
          loader={contenfulLoader}
        />
      )}
      <h2 className="text-base font-normal mt-4 text-black font-sans dark:text-white">{summary}</h2>
    </>
  );
};
