export const documentTagfromPath = documentTag => {
  const regex = /^\/document\/(?<documentTag>.*)$/
  return documentTag.match(regex).groups.documentTag
}
