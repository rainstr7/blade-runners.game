import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import isDev from './utils/IsDev'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

// import { createClientAndConnect } from './db'
import {connectToDB} from './dbapi'
import { getAllForums, getForumById } from './controllers/forumController'
import { createTopic, getTopicsByForumId } from './controllers/topicController'
import {
  getMessagesByTopicId,
  createMessage,
  updateMessage,
  deleteMessage,
} from './controllers/messageController'
// import Forum from './models/Forum'

const routes = ['/', '/signin', '/signup']

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  // createClientAndConnect()
  // Подключаемся к БД
  connectToDB()
  // const res = await Forum.findAll()
  // console.log(res)
  // sequelize
  //   .authenticate()
  //   .then(() => {
  //     console.log('Соединение с БД установленно')
  //   })
  //   .catch((err: Error) => {
  //     console.error('Неудалось подключиться к БД: ', err)
  //   })

  // sequelize.sync({ force: true })

  let vite: ViteDevServer | undefined

  const distPath = path.resolve('../../client/dist')
  const srcPath = path.resolve('../../client')
  const ssrClientPath = path.resolve('../../client/ssr-dist/client.cjs')

  app.get('/forum', getAllForums)
  app.get('/topics/:id', getForumById)

  app.get('/topics/:forumId', getTopicsByForumId)
  app.post('/topics', createTopic)

  app.get('/discuss/:topicId', getMessagesByTopicId)
  app.post('/discuss', createMessage)
  app.put('/discuss/:id', updateMessage)
  app.delete('/discuss/:id', deleteMessage)

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let create: (initialState: any) => any
      let render: (store: any, url: string) => Promise<string>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
        create = (await import(ssrClientPath)).create
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render

        create = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .create
      }

      const store = create({
        score: {
          value: 0,
          leaderboard: [],
        },
        user: {
          id: undefined,
          first_name: undefined,
          second_name: undefined,
          display_name: undefined,
          login: undefined,
          email: undefined,
          phone: undefined,
          avatar: undefined,
        },
        alert: {
          show: false,
          type: 'success',
          text: '',
        },
        loading: { loading: false },
      })

      let renderUrl = '/'
      const availRoute = routes.find(r => r === url)
      if (availRoute) {
        renderUrl = availRoute
      }

      const appHtml = await render(store, renderUrl)

      const html = template.replace(
        `<!--ssr-outlet-->`,
        appHtml +
          `<script> 
          window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(
            /</g,
            '\\u003c'
          )}
        </script>`
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
