
export const utf8Tob64 = (str: string) => {
  return Buffer.from(encodeURIComponent(str)).toString('base64')
}

export const b64Toutf8 = (str: string) => {
  return decodeURIComponent(Buffer.from(str, 'base64').toString())
}
