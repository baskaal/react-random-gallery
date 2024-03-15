import { formatSrcSet } from ".";
import { TImage, TLoadedImage } from "../types";

export const loadImages = (images: TImage[]): Promise<TLoadedImage[]> => {
  return Promise.all(images.map(async (image) => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve({
      ...image,
      width: img.naturalWidth,
      height: img.naturalHeight,
    });

    img.onerror = (error) => reject(error);

    if (image.srcSet) img.srcset = formatSrcSet(image.srcSet);
    img.src = image.src;
  })));
}
