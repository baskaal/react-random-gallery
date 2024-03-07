export type TImage = {
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

export type TImages = TImage[];

export type TOptions = {
  imageOffset?: number;
  galleryHeight?: string | number;
  animation: {
    duration?: string | number;
    delay?: string | number;
  }
}
