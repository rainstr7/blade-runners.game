import type { RequestHandler } from 'express'
import { YANDEX_API_HOST } from './constants'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch')

export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  if (req.headers.cookie) {
    fetch(`${YANDEX_API_HOST}/auth/user`, {
      headers: {
        Cookie: req.headers.cookie,
        credentials: 'include',
      },
    })
      .then((isAuth: Response) => {
        if (isAuth.ok) {
          isAuth
            .json()
            .then(user => {
              res.locals.user = user
              next()
            })
            .catch(next)
        } else {
          next()
        }
      })
      .catch(next)
  } else {
    next()
  }
}
