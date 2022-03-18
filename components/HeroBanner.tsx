import { ContentfulImage } from '@types';
import Image from 'next/image';
import React from 'react';
import { contenfulLoader } from '@utilities';

type HeroBannerProps = {
  title: string;
  image?: ContentfulImage;
  summary: string;
};

export const HeroBanner = ({ title, image, summary }: HeroBannerProps) => {
  return (
    <>
      <h1 className="mb-6 text-center">{title}</h1>
      {image.file && (
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
