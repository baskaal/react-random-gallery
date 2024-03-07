import styled from 'styled-components'

export const SGallery = styled.div<{ height: string | number }>(({ height }) => ({
  position: 'relative',
  width: '100%',
  height,
}))

export const SGalleryItem = styled.div<{ selected: boolean }>(({ selected }): any => ({
  transition: 'all .4s ease',

  ...(selected && {
    position: 'absolute !important',
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
}))

export const SGalleryItemImage = styled.img<{ selected: boolean }>(() => ({
  cursor: 'pointer',
  width: '100%',
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
    pointerEvents: 'auto',
  }))
}))
