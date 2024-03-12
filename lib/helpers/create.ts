import { pull, random, sample } from "lodash"
import { isBadPlacement, getRandomPlacement, loadImages } from "./"
import { TImages, TOptions } from "../types"

export const createGallery = async (el: HTMLDivElement, images: TImages, options: TOptions) => {
  const canvasWidth = Math.floor(el.getBoundingClientRect().width || 0)
  let canvasHeight = options.gallery?.height ? Math.floor(el.getBoundingClientRect().height || 0) : 500

  const maxTries = 2000
  let tries = 0

  let unplacedImages: TImages = await loadImages(images)

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
      offset: options.images?.offset
    })

    const noSpaceLeft = tries === maxTries;

    if (badPlacement) {
      if (noSpaceLeft) {
        if (options.gallery?.height) {
          unplacedImages = [];
        } else {
          canvasHeight += 100
          tries = 0
        }
      }

      continue
    }

    tries = 0

    const rotation = options.images?.rotation ? random(-options.images?.rotation, options.images?.rotation) : 0;

    placedImages.push({
      ...randomPlacedImage,
      style: {
        width: randomPlacedImage.width + 'px',
        height: randomPlacedImage.height + 'px',
        left: randomPlacedImage.x + 'px',
        top: randomPlacedImage.y + 'px',
        transform: `translate(0, 0) rotate(${rotation}deg)`,
      }
    })

    pull(unplacedImages, randomImage)
  }

  return {
    images: placedImages,
    height: canvasHeight
  }
}
