export const srcSet = (srcSet: string[]) => {
  return srcSet
    .map((src, index) => `${src} ${index + 1}x`)
    .join(', ')
}

export const cn = (classNames: (string | false | undefined)[]): string => {
  return classNames.filter((className) => className).join(' ')
}
