export function initialServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register('sw.js')
        console.info('ServiceWorker registration successful: ', reg)
      } catch (error) {
        console.error('ServiceWorker registration failed: ', error)
      }
    })
  }
}
