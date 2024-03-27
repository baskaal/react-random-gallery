import { useMemo } from 'react'
import { useDebouncedValue, useWindowSize } from 'rooks'
import { Gallery, TOptions } from '../../src'
import { getImages } from './helpers'
import { GlobalStyle, colors } from './style'

const App = () => {
  const { innerWidth } = useWindowSize()
  const [debouncedInnerWidth] = useDebouncedValue(innerWidth, 300)

  const images = useMemo(() => getImages(debouncedInnerWidth || 0), [debouncedInnerWidth])

  const options: TOptions = {
    gallery: {
      height: 'calc(100vh - 4rem)'
    },
    images: {
      offset: -10,
      rotation: 10,
      maxWidth: 200
    },
    animation: {
      duration: '.5s'
    }
  }

  return (
    <>
      <GlobalStyle />
      <div style={{ margin: '2rem', border: `1px solid ${colors.grey}` }}>
        <Gallery images={images} options={options} />
      </div>
    </>
  )
}

export default App
