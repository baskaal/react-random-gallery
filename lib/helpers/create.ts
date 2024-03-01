import sequential from "promise-sequential"
import { getDimensions, isBadPlacement, getRandomPlacement } from "./"
import { Images } from ".."

export const createGallery = async (el: HTMLDivElement, imageUrls: Images) => {
  const canvasWidth = Math.floor(el.getBoundingClientRect().width || 0)
  let canvasHeight = 500
  let offsetY = 0

  const images = await sequential(imageUrls.map((image) => async () => {
    const { width, height } = await getDimensions(image.src);

    return {
      ...image,
      width,
      height,
    }
  }));

  const placedImages: any = [];

  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    let randomizedImage = getRandomPlacement(image, canvasWidth, canvasHeight, offsetY)

    let tries = 0;
    const maxTries = 500

    while (isBadPlacement({ image: randomizedImage, placedImages, canvasWidth, canvasHeight })) {
      tries++
      randomizedImage = getRandomPlacement(image, canvasWidth, canvasHeight, offsetY)

      if (tries === maxTries) {
        offsetY = canvasHeight
        canvasHeight += image.height * 1.25
        tries = 0
      }
    }

    placedImages.push({
      ...randomizedImage,
      style: {
        position: 'absolute',
        width: randomizedImage.width + 'px',
        height: randomizedImage.height + 'px',
        left: randomizedImage.x + 'px',
        top: randomizedImage.y + 'px',
        // transform: `rotate(${image.rotate}deg)`,
      }
    });
  }

  return {
    images: placedImages,
    height: canvasHeight
  }
}
