import { formatSrcSet } from ".";
import { TImages } from "../types";

export const loadImages = (images: TImages): Promise<TImages> => {
  return Promise.all(images.map(async (image) => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve({
      ...image,
      width: img.naturalWidth,
      height: img.naturalHeight,
    });

    img.onerror = (error) => reject(error);

    img.srcset = formatSrcSet(image.srcSet);
    img.src = image.src;
  })))
}
