import type { RequestHandler } from 'express'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'
import User from '../database/models/User'
import { allowedHosts, YANDEX_API_HOST } from './constants'

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  if (!allowedHosts.includes(req.hostname)) {
    res.statusCode = 403
    res.send(`<!doctype html><p>Forbidden</p>`)
    return
  }

  return createProxyMiddleware({
    target: YANDEX_API_HOST,
    pathRewrite: { '^/yandex-api': '' },
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    selfHandleResponse: true,
    logLevel: 'debug',
    onProxyRes: responseInterceptor(async responseBuffer => {
      if (req.url.includes('/auth/user') && req.method === 'GET') {
        const response = responseBuffer.toString()
        let user
        try {
          user = JSON.parse(response)
        } catch (e) {
          user = null
        }
        if (user && user.id) {
          try {
            await User.upsert({
              id: user.id,
              first_name: user.first_name,
              second_name: user.second_name,
              display_name: user.display_name,
              login: user.login,
              email: user.email,
              phone: user.phone,
              avatar: user.avatar,
            })
          } catch (e) {
            console.error(e)
          }
        }
      }
      return responseBuffer
    }),
  })(req, res, next)
}
