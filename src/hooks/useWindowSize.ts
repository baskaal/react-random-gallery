import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const onResize = debounce(() => setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    }), 100)

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return dimensions
}
