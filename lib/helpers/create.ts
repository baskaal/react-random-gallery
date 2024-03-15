import { pull, sample } from "lodash"
import { checkPlacement, getRandomPlacement, loadImages } from "./"
import { TImage, TLoadedImage, TPlacedImage, TOptions } from "../types"

export const createGallery = async (el: HTMLDivElement, images: TImage[], options: TOptions) => {
  const canvasWidth = Math.floor(el.getBoundingClientRect().width || 0)
  let canvasHeight = options.gallery?.height ? Math.floor(el.getBoundingClientRect().height || 0) : 500

  const maxTries = 2000
  let tries = 0

  let unplacedImages: TLoadedImage[] = await loadImages(images)

  const placedImages: TPlacedImage[] = []

  while (unplacedImages.length) {
    tries++

    const randomImage = sample(unplacedImages)!
    const placedImage = getRandomPlacement(randomImage, canvasWidth, canvasHeight, options)

    const goodPlacement = checkPlacement({
      image: placedImage,
      placedImages,
      canvasWidth,
      canvasHeight,
      offset: options.images?.offset
    })

    if (goodPlacement) {
      placedImages.push(placedImage)
      pull(unplacedImages, randomImage)
      tries = 0

      continue
    }

    const noSpaceLeft = tries === maxTries;

    if (noSpaceLeft) {
      if (options.gallery?.height) {
        unplacedImages = [];
      } else {
        canvasHeight += 100
        tries = 0
      }
    }
  }

  return {
    images: placedImages,
    height: canvasHeight
  }
}
