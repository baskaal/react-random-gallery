import { FC, useRef, useState } from 'react';
import { useAsyncEffect } from 'rooks';
import { createGallery } from './helpers';
import { SGallery, SGalleryBackdrop, SGalleryItem, SGalleryItemImage } from './Gallery.styled';
import { Images, Options } from './types';

type GalleryProps = {
  images: Images;
  options: Options;
}

export const Gallery: FC<GalleryProps> = ({ images, options }) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [gallery, setGallery] = useState<{ height: number, images?: Images }>({ height: 500 })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const previewImage = (index: number) => {
    setSelectedImageIndex(index);
  }

  const clearPreviewImage = () => {
    setSelectedImageIndex(null);
  }

  const formatSrcSet = (srcSet: string[]) => srcSet
    .map((src, index) => `${src} ${index + 1}x`)
    .join(', ');

  useAsyncEffect(async () => {
    if (!images?.length) return;
    if (!galleryRef?.current) return;

    const gallery = await createGallery(galleryRef.current, images, options)
    setGallery(gallery);
  }, [galleryRef.current])

  return (
    <div ref={galleryRef}>
      <SGallery height={options.galleryHeight || gallery.height}>
        <SGalleryBackdrop
          onClick={() => clearPreviewImage()}
          selected={selectedImageIndex !== null}
        />
        { gallery.images?.map((image, imageIndex: number) => (
          <SGalleryItem
            key={`image-${imageIndex}`}
            style={image.style}
            onClick={() => previewImage(imageIndex)}
            selected={selectedImageIndex === imageIndex}
          >
            { image.formats?.length ? (
              <picture>
                { image.formats.map((format) => (
                  <source
                    srcSet={formatSrcSet(format.srcSet)}
                    media={`(min-width: ${format.size})`}
                  />
                )) }
                <SGalleryItemImage
                  src={image.src}
                  srcSet={formatSrcSet(image.srcSet)}
                  alt={image.alt}
                  selected={selectedImageIndex === imageIndex}
                />
              </picture>
            ) : (
              <SGalleryItemImage
                src={image.src}
                srcSet={formatSrcSet(image.srcSet)}
                alt={image.alt}
                selected={selectedImageIndex === imageIndex}
              />
            ) }
          </SGalleryItem>
        )) }
      </SGallery>
    </div>
  )
};
