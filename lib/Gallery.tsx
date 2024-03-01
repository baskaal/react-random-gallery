import { FC, useRef, useState } from 'react';
import { useAsyncEffect } from 'rooks';
import { createGallery } from './helpers';
import { SGallery, SGalleryBackdrop, SGalleryItem, SGalleryItemImage } from './Gallery.styled';

interface GalleryProps {
  images?: { url: string }[];
}

export const Gallery: FC<GalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [gallery, setGallery]: any = useState({})
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const previewImage = (index: number) => {
    setSelectedImageIndex(index);
  }

  const clearPreviewImage = () => {
    setSelectedImageIndex(null);
  }

  useAsyncEffect(async () => {
    if (!images?.length) return;
    if (!galleryRef?.current) return;

    const gallery = await createGallery(galleryRef.current, images)
    setGallery(gallery);
  }, [galleryRef.current])

  return (
    <div ref={galleryRef}>
      <SGallery height={gallery.height || 500}>
        <SGalleryBackdrop
          onClick={() => clearPreviewImage()}
          selected={selectedImageIndex !== null}
        />
        { gallery.images?.map((image: any, imageIndex: number) => (
          <SGalleryItem
            key={`image-${imageIndex}`}
            style={image.style}
            onClick={() => previewImage(imageIndex)}
            selected={selectedImageIndex === imageIndex}
          >
            <SGalleryItemImage
              src={selectedImageIndex === imageIndex ? image.largeUrl : image.url}
              alt={image.smallUrl}
              width={image.width}
              height={image.height}
              selected={selectedImageIndex === imageIndex}
            />
          </SGalleryItem>
        )) }
      </SGallery>
    </div>
  )
};
