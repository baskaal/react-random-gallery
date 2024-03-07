import sequential from "promise-sequential"
import { pull, sample } from "lodash"
import { getDimensions, isBadPlacement, getRandomPlacement } from "./"
import { TImages, TOptions } from "../types"

export const createGallery = async (el: HTMLDivElement, images: TImages, options: TOptions) => {
  const canvasWidth = Math.floor(el.getBoundingClientRect().width || 0)
  let canvasHeight = options.galleryHeight ?
    Math.floor(el.getBoundingClientRect().height || 0) : 500

  const maxTries = 2000
  let tries = 0

  let unplacedImages: TImages = await sequential(images.map((image) => async () => ({
    ...image,
    ...(await getDimensions(image))
  })))

  const placedImages: TImages = []

  while (unplacedImages.length) {
    tries++

    const randomImage = sample(unplacedImages)!
    const randomPlacedImage = getRandomPlacement(randomImage, canvasWidth, canvasHeight)

    const badPlacement = isBadPlacement({
      image: randomPlacedImage,
      placedImages,
      canvasWidth,
      canvasHeight,
      offset: options.imageOffset
    })

    const noSpaceLeft = tries === maxTries;

    if (badPlacement) {
      if (noSpaceLeft) {
        if (options.galleryHeight) {
          unplacedImages = [];
        } else {
          canvasHeight += 100
          tries = 0
        }
      }

      continue
    }

    tries = 0

    placedImages.push({
      ...randomPlacedImage,
      style: {
        width: randomPlacedImage.width + 'px',
        height: randomPlacedImage.height + 'px',
        left: randomPlacedImage.x + 'px',
        top: randomPlacedImage.y + 'px',
        transform: `translate(0, 0) rotate(${randomPlacedImage.rotate}deg)`,
      }
    })

    pull(unplacedImages, randomImage)
  }

  return {
    images: placedImages,
    height: canvasHeight
  }
}
