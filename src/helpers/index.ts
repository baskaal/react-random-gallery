import { last, random, times } from 'lodash'
import randomColor from 'randomcolor'

const getNumber = (range: [number, number]) => Math.ceil(random(range[0], range[1]) / 10) * 10

export const getImages = (innerWidth: number = 0) => {
  const settings: { [minWidth: string]: { range: [number, number] } } = {
    0: { range: [20, 100] },
    320: { range: [40, 140] },
    768: { range: [60, 180] },
    1024: { range: [80, 220] }
  }

  const currentSettings = last(Object.entries(settings).filter(([minWidth]) => innerWidth >= Number(minWidth)))![1]

  return times(40, (index: number) => {
    const bg = randomColor().replace('#', '')
    const w = getNumber(currentSettings.range)
    const h = getNumber(currentSettings.range)
    const getImgUrl = (retina = 0) => `https://placehold.co/${w}x${h}${retina ? `@${retina}x` : ''}/${bg}/fff.webp?font=roboto`

    return {
      src: getImgUrl(),
      srcSet: [getImgUrl(), getImgUrl(2), getImgUrl(3)],
      alt: `Example image ${index}`
    }
  })
}
