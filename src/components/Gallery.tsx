import { FC, useRef, useState } from 'react'
import { useAsyncEffect } from 'rooks'
import { SGallery, SGalleryBackdrop } from './Gallery.styled'
import { GalleryItem } from './GalleryItem'
import { createGallery } from '../helpers'
import { TImage, TPlacedImage, TOptions } from '..'

type GalleryProps = {
  images: TImage[];
  options?: TOptions;
}

export const Gallery: FC<GalleryProps> = ({ images, options }) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [gallery, setGallery] = useState<{ height: number, width: number, images?: TPlacedImage[] }>({ height: 500, width: 500 })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const previewImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  const clearPreviewImage = () => {
    setSelectedImageIndex(null)
  }

  useAsyncEffect(async () => {
    if (!images?.length) return
    if (!galleryRef.current) return

    const gallery = await createGallery(galleryRef.current, images, options)
    setGallery(gallery)
  }, [images, galleryRef.current])

  return (
    <div ref={galleryRef}>
      <SGallery
        height={options?.gallery?.height || gallery.height}
        width={options?.gallery?.width || gallery.width}
      >
        <SGalleryBackdrop
          onClick={() => clearPreviewImage()}
          selected={selectedImageIndex !== null}
        />
        { gallery.images?.map((image, imageIndex: number) => (
          <GalleryItem
            key={`image-${imageIndex}`}
            test-id={`image-${imageIndex}`}
            image={image}
            selected={selectedImageIndex === imageIndex}
            onPreviewImage={() => previewImage(imageIndex)}
            options={options}
          />
        )) }
      </SGallery>
    </div>
  )
}
