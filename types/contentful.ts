export type ContentfulImage = {
  title: string;
  description: string;
  file: File;
};

export type File = {
  url: string;
  details: ImageDetails;
};

type ImageDetails = {
  size: number;
  image: ImageDimensions;
};

type ImageDimensions = {
  width: number;
  height: number;
};
