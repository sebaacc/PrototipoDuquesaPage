export const shortenUrl = (url) => {
  return url.replace(/(\.png|\.jpg).*$/, '$1')
}
