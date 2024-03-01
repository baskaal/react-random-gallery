import styled from 'styled-components'

export const SGallery = styled.div<{ height: number }>(({ height }) => ({
  position: 'relative',
  width: '100%',
  height,
  marginBottom: '200px',
}))

export const SGalleryItem = styled.div<{ selected: boolean }>(({ selected }): any => selected && ({
  position: 'fixed !important',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: '0 !important',
  left: '0 !important',
  right: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
  maxWidth: 'none !important',
  maxHeight: 'none !important',
  transform: 'none !important',
  pointerEvents: 'none',
  zIndex: '3000'
}))

export const SGalleryItemImage = styled.img<{ width: number, height: number, selected: boolean }>(({ width, height, selected }) => ({
  cursor: 'pointer',
  width,
  height,

  ...(selected && ({
    width: 'auto',
    maxWidth: '80%',
    maxHeight: '80%',
  }))
}))

export const SGalleryBackdrop = styled.div<{ selected: boolean }>(({ selected }) => ({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(black, .5)',
  opacity: '0',
  pointerEvents: 'none',
  zIndex: '2000',
  transition: 'all .5s ease',

  ...(selected && ({
    opacity: 1,
    pointerEvents: 'auto',
  }))
}))
