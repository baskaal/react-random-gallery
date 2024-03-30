import { Gallery, TOptions } from '../../src'
import { getImages } from './helpers'
import { GlobalStyle } from './style'

const App = () => {
  const images = getImages()

  const options: TOptions = {
    gallery: {
      height: 'calc(100vh - 4rem)'
    },
    images: {
      offset: -10,
      rotation: 10
    },
    animation: {
      duration: '.5s'
    }
  }

  return (
    <>
      <GlobalStyle />
      <div style={{ margin: '2rem', border: '1px solid #cccccc' }}>
        <Gallery images={images} options={options} />
      </div>
    </>
  )
}

export default App
