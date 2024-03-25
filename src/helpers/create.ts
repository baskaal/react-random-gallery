import { maxBy, pull, sample } from 'lodash'
import { checkPlacement, getRandomPlacement, loadImages } from '.'
import { TImage, TLoadedImage, TPlacedImage, TOptions } from '..'

export const createGallery = async (el: HTMLDivElement, images: TImage[], options?: TOptions) => {
  const galleryWidth = Math.floor(el.getBoundingClientRect().width || 0)
  let galleryHeight = options?.gallery?.height ? Math.floor(el.getBoundingClientRect().height || 0) : 500

  const maxTries = 2000
  let tries = 0

  let unplacedImages: TLoadedImage[] = await loadImages(images, options)

  const placedImages: TPlacedImage[] = []

  while (unplacedImages.length) {
    tries++

    const randomImage = sample(unplacedImages)!
    const placedImage = getRandomPlacement(randomImage, galleryWidth, galleryHeight, options)

    const goodPlacement = checkPlacement({
      image: placedImage,
      placedImages,
      galleryWidth,
      galleryHeight,
      offset: options?.images?.offset
    })

    if (goodPlacement) {
      placedImages.push(placedImage)
      pull(unplacedImages, randomImage)
      tries = 0

      continue
    }

    const noSpaceLeft = tries === maxTries

    if (noSpaceLeft) {
      if (options?.gallery?.height) {
        unplacedImages = []
      } else {
        galleryHeight += 100
        tries = 0
      }
    }
  }

  if (!options?.gallery?.height) {
    const bottomImage = maxBy(placedImages, ({ y, height }) => y + height)!
    galleryHeight = bottomImage.y + bottomImage.height
  }

  return {
    images: placedImages,
    height: galleryHeight,
    width: galleryWidth
  }
}
