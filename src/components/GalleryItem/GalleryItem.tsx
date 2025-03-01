import { useEffect } from 'react'
import { random } from 'lodash'
import { TGalleryItemProps } from '../../types'
import { srcSet } from '../../helpers'

export const GalleryItem = ({ image, imageIndex, isSelected, options, styleRef, onPreviewImage, ...props }: TGalleryItemProps) => {
  useEffect(() => {
    if (!styleRef.current) return

    styleRef.current.innerHTML += `
      @keyframes gallery-item-${imageIndex} {
        from {
          top: ${50 + random(-5, 5)}%;
          left: ${50 + random(-5, 5)}%;
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          top: ${image.style.top};
          left: ${image.style.left};
          transform: ${image.style.transform};
        }
      }
    `
  }, [image])

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) rotate(0deg)',
        maxWidth: image.style.width,
        maxHeight: image.style.height,
        animation: options?.animation && `
          gallery-item-${imageIndex}
          ${options.animation?.duration || '1s'}
          ${options.animation?.timingFunction || 'ease'}
          ${options.animation?.delay || '0s'}
          forwards
        `,

        ...(isSelected && {
          position: 'fixed',
          top: '0 !important',
          left: '0 !important',
          right: '0 !important',
          bottom: '0 !important',
          maxWidth: 'none !important',
          maxHeight: 'none !important',
          transform: 'none !important',
          animation: 'none',
          pointerEvents: 'none',
          zIndex: 5000
        })
      }}
      onClick={onPreviewImage}
      {...props}
    >
      <img
        style={{
          cursor: 'pointer',
          width: '100%'
        }}
        src={image.src}
        srcSet={image.srcSet ? srcSet(image.srcSet) : ''}
        alt={image.alt}
      />
    </div>
  )
}
