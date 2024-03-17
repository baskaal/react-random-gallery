import { random } from "lodash";
import { contains, overlaps } from "./";
import { TLoadedImage, TImageCoords, TOptions, TPlacedImage } from "../types";

export const getRandomPlacement = (image: TLoadedImage, galleryWidth: number, galleryHeight: number, options: TOptions): TPlacedImage => {
  // const randomIncreaseValue = random(20, 80) / 100
  // const randomImageWidth = Math.round(image.width! * randomIncreaseValue)
  // const randomImageHeight = Math.round(image.height! * randomIncreaseValue)
  const randomPos = {
    x: random(0, galleryWidth - image.width!),
    y: random(0, galleryHeight - image.height!)
  };

  const rotation = options.images?.rotation ? random(-options.images?.rotation, options.images?.rotation) : 0;

  return {
    ...image,
    ...randomPos,
    style: {
      width: image.width + 'px',
      height: image.height + 'px',
      left: randomPos.x + 'px',
      top: randomPos.y + 'px',
      transform: `translate(0, 0) rotate(${rotation}deg)`,
    }
    // width: randomImageWidth,
    // height: randomImageHeight,
  }
}

export const getCoordinates = ({ x, y, width, height }: TPlacedImage): TImageCoords => ({
  x1: x,
  x2: x + width,
  y1: y,
  y2: y + height
});

export const isOffCanvas = (image: TImageCoords, galleryWidth: number, galleryHeight: number) => {
  if (image.x1 < 0 || image.x2 > galleryWidth) return true;
  if (image.y1 < 0 || image.y2 > galleryHeight) return true;

  return false
}

export const checkPlacement = ({
  image,
  placedImages,
  galleryWidth,
  galleryHeight,
  offset = 0,
}: {
  image: TPlacedImage,
  placedImages: TPlacedImage[],
  galleryWidth: number,
  galleryHeight: number,
  offset?: number,
}) => {
  const img1 = getCoordinates(image);

  if (isOffCanvas(img1, galleryWidth, galleryHeight)) return false;

  return !(placedImages.some((placedImage) => {
    const img2 = getCoordinates(placedImage);

    return contains(img1, img2) || overlaps(img1, img2, offset);
  }))
}
