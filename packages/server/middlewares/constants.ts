export const YANDEX_API_HOST = 'https://ya-praktikum.tech/api/v2'
export const API_HOST =
  (typeof process !== 'undefined' ? process.env?.API_HOST : '') ||
  'http://localhost:3001'
export const allowedHosts = [
  'localhost',
  '127.0.0.1',
  new URL(API_HOST).hostname,
]
