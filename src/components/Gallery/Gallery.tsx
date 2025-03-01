import { FC, useEffect, useRef, useState } from 'react'
import { useWindowSize } from '../../hooks'
import { createGallery } from '../../helpers'
import { TGalleryProps, TPlacedImage } from '../../types'
import { GalleryItem } from '../'

export const Gallery: FC<TGalleryProps> = ({ images, options }) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const styleRef = useRef<HTMLStyleElement>(null)
  const [gallery, setGallery] = useState<{ height: number, width: number, images?: TPlacedImage[] }>({ height: 500, width: 500 })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const { width } = useWindowSize()

  useEffect(() => {
    if (!galleryRef.current) return
    if (!styleRef.current) return
    if (!images?.length) return

    styleRef.current.innerHTML = ''

    const createGalleryAsync = async () => {
      setGallery(await createGallery(galleryRef.current!, images, options))
    }

    createGalleryAsync()
  }, [galleryRef.current, styleRef.current, images, width])

  return (
    <div ref={galleryRef}>
      <style ref={styleRef} />
      <div
        style={{
          height: options?.gallery?.height || gallery.height,
          width: options?.gallery?.width || gallery.width,
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, .75)',
            opacity: 0,
            zIndex: 4000,
            pointerEvents: 'none',
            transition: 'all .5s ease',

            ...(selectedImageIndex !== null && {
              opacity: 1,
              pointerEvents: 'auto'
            })
          }}
          onClick={() => setSelectedImageIndex(null)}
        />
        { gallery.images?.map((image, imageIndex: number) => (
          <GalleryItem
            key={`image-${imageIndex}`}
            test-id={`image-${imageIndex}`}
            image={image}
            imageIndex={imageIndex}
            isSelected={selectedImageIndex === imageIndex}
            options={options}
            styleRef={styleRef}
            onPreviewImage={() => setSelectedImageIndex(imageIndex)}
          />
        )) }
      </div>
    </div>
  )
}
