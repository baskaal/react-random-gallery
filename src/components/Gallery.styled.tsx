import { styled, css, keyframes } from 'styled-components'

export const SGallery = styled.div<{ height: string | number, width: string | number }>(({ height, width }) => ({
  position: 'relative',
  height,
  width
}))

const posAnimation = ({ top, left, transform }: any) => keyframes`
  from {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    top: ${top};
    left: ${left};
    transform: ${transform};
  }
`

export const SGalleryItem = styled.div<{ selected: boolean, animation: any }>(
  ({ selected }) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(0deg)',

    ...(selected && {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '0 !important',
      left: '0 !important',
      right: '0 !important',
      bottom: '0 !important',
      width: '100% !important',
      height: '100% !important',
      maxWidth: 'none !important',
      maxHeight: 'none !important',
      transform: 'none !important',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 3000
    })
  }),
  ({ animation }) => animation && css`
    animation:
      ${posAnimation(animation.style)}
      ${animation.duration || '1s'}
      ${animation.timingFunction || 'ease'}
      ${animation.delay || '0s'}
      forwards;
  `
)

export const SGalleryItemImage = styled.img<{ selected: boolean }>(() => ({
  cursor: 'pointer',
  width: '100%'
}))

export const SGalleryBackdrop = styled.div<{ selected: boolean }>(({ selected }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, .5)',
  pointerEvents: 'none',
  opacity: 0,
  zIndex: 2000,
  transition: 'all .5s ease',

  ...(selected && ({
    opacity: 1,
    pointerEvents: 'auto'
  }))
}))
