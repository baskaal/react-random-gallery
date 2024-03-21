import chroma from 'chroma-js'

const white = chroma('white').darken(0.08).hex()
const black = chroma('black').brighten(0.08).hex()

const grey = chroma('white').darken(1).hex()

export const colors = {
  white,
  black,
  grey
}
