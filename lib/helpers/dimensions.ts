import { TImage } from "../types";

export const formatSrcSet = (srcSet: string[]) => srcSet
  .map((src, index) => `${src} ${index + 1}x`)
  .join(', ');

export const getDimensions = ({ src }: TImage): Promise<{ width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    }

    img.onerror = (error) => {
      reject(error);
    }

    img.src = src;
  });
};
