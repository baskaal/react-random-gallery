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
  gallery?: {
    height?: string | number;
  };
  images?: {
    offset?: number;
    rotation?: number;
  };
  animation: {
    duration?: string | number;
    delay?: string | number;
  };
}
