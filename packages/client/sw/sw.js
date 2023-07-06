const CHECK_ONLINE_STATUS_PARAM = 'check-online'
const VERSION = '0.0.1'
const STATIC_CACHE_NAME = `static-app-v-${VERSION}`
const DYNAMIC_CACHE_NAME = `dynamic-app-v-${VERSION}`
const INDEX_HTML_PATH = './index.html'

const ASSET_URLS = ['/*', INDEX_HTML_PATH]

console.info(`[SW]: VERSION ${VERSION}`)

self.addEventListener('install', event => {
  console.log('[SW]: install')

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSET_URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

self.addEventListener('activate', async () => {
  console.log('[SW]: activate')

  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(
        cacheName =>
          cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME
      )
      .map(cacheName => caches.delete(cacheName))
  )
})

self.addEventListener('fetch', async event => {
  const { request } = event
  const url = new URL(request.clone().url)
  const isCheckOnlineParam = url.searchParams.get(CHECK_ONLINE_STATUS_PARAM)
  try {
    if (isCheckOnlineParam) {
      await event.respondWith(fetch(request))
    } else {
      await event.respondWith(networkFirst(request))
    }
  } catch (err) {
    console.error(err)
  }
})

async function networkFirst(request) {
  const fetchRequest = await request.clone()
  const cache = await caches.open(DYNAMIC_CACHE_NAME)

  try {
    const response = await fetch(fetchRequest)
    await cache.put(request, response.clone())

    return response
  } catch (err) {
    const cached = await caches.match(request)

    if (cached) {
      return cached
    }
    const cache = await caches.open(STATIC_CACHE_NAME)
    return await cache.match(INDEX_HTML_PATH)
  }
}
