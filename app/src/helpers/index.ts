import { random, times } from 'lodash'
import randomColor from 'randomcolor'
import { TImage } from '../../../src'

const getNumber = (range: [number, number]) => Math.ceil(random(range[0], range[1]) / 10) * 10

export const getImages = (): TImage[] => {
  return times(100, (index: number) => {
    const bg = randomColor({ hue: 'green' }).replace('#', '')
    const w = getNumber([50, 180])
    const h = getNumber([50, 180])
    const getImgUrl = (retina = 0) => `https://placehold.co/${w}x${h}${retina ? `@${retina}x` : ''}/${bg}/fff.webp?font=roboto`

    return {
      alt: `Example image ${index}`,
      srcSet: [getImgUrl(), getImgUrl(2), getImgUrl(3)]
    }
  })
}
