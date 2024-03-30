import { formatSrcSet } from '.'
import { TImage, TLoadedImage, TOptions } from '..'

export const loadImages = (images: TImage[], options: TOptions): Promise<TLoadedImage[]> => {
  return Promise.all(images.map(async (image) => new Promise((resolve, reject) => {
    const img = new Image()

    const maxWidth = options.images?.maxWidth
    const maxHeight = options.images?.maxHeight

    img.onload = () => {
      const width = img.naturalWidth
      const height = img.naturalHeight

      const widthModifier = (maxHeight && height > maxHeight) ? maxHeight / height : 1
      const heightModifier = (maxWidth && width > maxWidth) ? maxWidth / width : 1

      resolve({
        ...image,
        width: maxWidth && width > maxWidth ? maxWidth : width * widthModifier,
        height: maxHeight && height > maxHeight ? maxHeight : height * heightModifier
      })
    }

    img.onerror = (error) => reject(error)

    if (image.srcSet) img.srcset = formatSrcSet(image.srcSet)
    if (image.src) img.src = image.src
  })))
}
