export const formatSrcSet = (srcSet: string[]) => srcSet
  .map((src, index) => `${src} ${index + 1}x`)
  .join(', ')
