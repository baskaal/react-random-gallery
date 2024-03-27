import { SGalleryItem, SGalleryItemImage } from './Gallery.styled'
import { TPlacedImage, TOptions } from '..'
import { formatSrcSet } from '../helpers'

type GalleryItemProps = {
  image: TPlacedImage;
  selected: boolean;
  onPreviewImage: () => void;
  options?: TOptions;
}

export const GalleryItem = ({ image, selected, onPreviewImage, options, ...props }: GalleryItemProps) => (
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
    <picture>
      { image.formats?.map((format) => (
        <source
          srcSet={formatSrcSet(format.srcSet)}
          media={`(min-width: ${format.size})`}
        />
      )) }
      <SGalleryItemImage
        src={image.src}
        srcSet={image.srcSet && formatSrcSet(image.srcSet)}
        alt={image.alt}
        selected={selected}
      />
    </picture>
  </SGalleryItem>
)
