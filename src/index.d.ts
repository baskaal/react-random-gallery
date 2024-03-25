export type TImage = {
  src: string;
  srcSet?: string[];
  alt?: string;
  formats?: {
    srcSet: string[];
    size: string;
  }[];
}

export type TLoadedImage = TImage & {
  width: number;
  height: number;
}

export type TPlacedImage = TLoadedImage & {
  x: number;
  y: number;
  style: {
    width: string | number;
    height: string | number;
    left: string | number;
    top: string | number;
    transform: string;
  };
}

export type TImageCoords = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export type TOptions = {
  gallery?: {
    height?: string | number;
    width?: string | number;
  };
  images?: {
    offset?: number;
    rotation?: number;
    maxWidth?: number;
    maxHeight?: number;
  };
  animation: {
    duration?: string | number;
    delay?: string | number;
  };
}
