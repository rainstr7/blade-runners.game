export const getLayout = (page: string) => {
  switch (page) {
    case '/':
      return ['Landing', '']
    case '/404':
    case '/500':
      return ['Error', page.slice(1)]
    case '/gameover':
      return ['GameOver', 'GAME OVER']
    default:
      return ['Default', 'BLADE RUNNER']
  }
}
