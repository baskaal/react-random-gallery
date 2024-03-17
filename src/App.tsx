import { times, random, last } from 'lodash'
import randomcolor from 'randomcolor'
import { Gallery, TOptions } from '../lib'

const getNumber = (range: [number, number]) => Math.ceil(random(range[0], range[1]) / 10) * 10

const getImages = () => {
  const settingsPerBreakpoint: { [bp: string]: { range: [number, number] } } = {
    0: { range: [20, 100] },
    320: { range: [40, 140] },
    768: { range: [60, 180] },
    1024: { range: [80, 220] }
  }

  const settings = last(Object.entries(settingsPerBreakpoint).filter(([bp]) => window.innerWidth >= Number(bp)))![1]

  return times(40, (index: number) => {
    const bg = randomcolor().replace('#', '')
    const w = getNumber(settings.range)
    const h = getNumber(settings.range)
    const getImgUrl = (retina = 0) => `https://placehold.co/${w}x${h}${retina ? `@${retina}x` : ''}/${bg}/fff.webp?font=roboto`

    return {
      src: getImgUrl(),
      srcSet: [getImgUrl(), getImgUrl(2), getImgUrl(3)],
      alt: `Example image ${index}`
    }
  })
}

const App = () => {
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

  const images = getImages()

  return (
    <div style={{ margin: '2rem', border: '1px solid grey' }}>
      <Gallery images={images} options={options} />
    </div>
  )
}

export default App
