import { SGalleryItem, SGalleryItemImage } from './Gallery.styled'
import { TPlacedImage, TOptions } from '..'
import { formatSrcSet } from '../helpers'

type GalleryItemProps = {
  image: TPlacedImage;
  selected: boolean;
  onPreviewImage: () => void;
  options?: TOptions;
}

export const GalleryItem = ({ image, selected, onPreviewImage, options, ...props }: GalleryItemProps) => {
  return (
    <SGalleryItem
      style={{
        maxWidth: image.style.width,
        maxHeight: image.style.height
      }}
      animation={{
        ...options?.animation,
        style: {
          top: image.style.top,
          left: image.style.left,
          transform: image.style.transform
        }
      }}
      onClick={onPreviewImage}
      selected={selected}
      {...props}
    >
      <SGalleryItemImage
        {...(image.src && { src: image.src })}
        {...(image.srcSet && { srcSet: formatSrcSet(image.srcSet) })}
        alt={image.alt}
        selected={selected}
      />
    </SGalleryItem>
  )
}
