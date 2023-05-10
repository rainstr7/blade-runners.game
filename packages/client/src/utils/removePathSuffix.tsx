function removePathSuffix(path: string): string {
  const index = path.lastIndexOf('/')
  if (index >= 0) {
    return path.substring(0, index)
  } else {
    return path
  }
}

export default removePathSuffix
