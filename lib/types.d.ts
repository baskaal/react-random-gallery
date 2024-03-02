export type Image = {
  src: string;
  srcSet: string[];
  formats?: {
    srcSet: string[];
    size: string;
  }[];
  alt: string;
  style?: any;
  width?: number;
  height?: number;
}

export type Images = Image[];

export type Options = {
  imageOffset?: number;
}
