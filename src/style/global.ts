import { createGlobalStyle } from 'styled-components'
import { colors } from '.'

export const GlobalStyle = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  },

  'html, body, body > div': {
    height: '100%'
  },

  body: {
    backgroundColor: colors.white
  }
})
