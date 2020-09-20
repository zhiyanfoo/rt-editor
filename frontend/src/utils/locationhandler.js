const documentTagRegex = /\/doc\/([A-Za-z-]+)/g

export const getDocumentTag = (pathname) => {
  // https://stackoverflow.com/questions/4724701/regexp-exec-returns-null-sporadically
  documentTagRegex.lastIndex = 0
  const arr = documentTagRegex.exec(pathname)
  const result = arr === null
  if (result) {
    throw new Error(`could not find a match for string '${pathname}'`)
  }
  return arr[1]
}
