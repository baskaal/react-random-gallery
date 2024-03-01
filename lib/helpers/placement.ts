import { random } from "lodash";
import { contains, overlaps } from "./";

export const getRandomPlacement = (image: any, canvasWidth: any, canvasHeight: any, offsetY: any) => {
  const randomIncreaseValue = random(20, 80) / 100
  const randomImageWidth = Math.round(image.width * randomIncreaseValue)
  const randomImageHeight = Math.round(image.height * randomIncreaseValue)

  const randomX = random(0, (canvasWidth - randomImageWidth))
  const randomY = random(offsetY, (canvasHeight - randomImageHeight))
  const randomRotate = random(-20, 20)

  return {
    ...image,
    // width: randomImageWidth,
    // height: randomImageHeight,
    x: randomX,
    y: randomY,
    rotate: randomRotate
  }
}

export const getCoordinates = ({ x, y, width, height }: any) => ({
  x1: x,
  x2: x + width,
  y1: y,
  y2: y + height
});

export const isOffCanvas = (image: any, canvasWidth: any, canvasHeight: any) => {
  if (image.x1 < 0 || image.x2 > canvasWidth) return true;
  if (image.y1 < 0 || image.y2 > canvasHeight) return true;

  return false
}

export const isBadPlacement = ({
  image,
  placedImages,
  canvasWidth,
  canvasHeight,
  offset = 0,
}: any) => {
  const img1 = getCoordinates(image);

  if (isOffCanvas(img1, canvasWidth, canvasHeight)) return true;

  return placedImages.some((placedImage: any) => {
    const img2 = getCoordinates(placedImage);

    return contains(img1, img2) || overlaps(img1, img2, offset);
  })
}
