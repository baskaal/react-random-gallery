import sequential from "promise-sequential"
import { pull, sample } from "lodash"
import { getDimensions, isBadPlacement, getRandomPlacement } from "./"
import { Images, Options } from "../types"

export const createGallery = async (el: HTMLDivElement, images: Images, options: Options) => {
  const canvasWidth = Math.floor(el.getBoundingClientRect().width || 0)
  let canvasHeight = options.galleryHeight ?
    Math.floor(el.getBoundingClientRect().height || 0) : 500

  const maxTries = 2000
  let tries = 0

  let unplacedImages: Images = await sequential(images.map((image) => async () => ({
    ...image,
    ...(await getDimensions(image.src))
  })))

  const placedImages: Images = []

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
        position: 'absolute',
        width: randomPlacedImage.width + 'px',
        height: randomPlacedImage.height + 'px',
        left: randomPlacedImage.x + 'px',
        top: randomPlacedImage.y + 'px',
        transform: `rotate(${randomPlacedImage.rotate}deg)`,
      }
    })

    pull(unplacedImages, randomImage)
  }

  return {
    images: placedImages,
    height: canvasHeight
  }
}
