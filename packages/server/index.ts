import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import isDev from './utils/IsDev'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import Forum from './database/models/forum'
import Topic from './database/models/topic'
import { dbConnect } from './database/init'
import { updateTheme, updateUser } from './controllers/userController'

const routes = ['/', '/signin', '/signup']
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

dotenv.config();
async function startServer() {

  const app = express()

  const clientPort = Number(process.env.CLIENT_PORT) || 3000;
  const serverPort = Number(process.env.SERVER_PORT) || 3001

  const corsOptions = {
    credentials: true,
    origin: [
      `http://127.0.0.1:${clientPort}`,
      `http://localhost:${clientPort}`,
    ],
  };
  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(cookieParser())
  // Подключаемся к БД
  dbConnect().then(async () => {
    await Forum.create({ title: 'forum first' })
    await Forum.create({ title: 'forum sec' })
    await Forum.create({ title: 'forum tree' })
    await Topic.create({ title: 'topic 1 and foum1', forumId: 1 })
    const forums = await Forum.findAll()
    console.log('FORUMS :', JSON.stringify(forums, null, 2))
    const topics = await Topic.findAll()
    console.log('TOPICS : ', JSON.stringify(topics))
  })

  let vite: ViteDevServer | undefined

  const distPath = path.resolve('../../client/dist')
  const srcPath = path.resolve('../../client')
  const swPath = path.resolve('../../client/sw')
  const ssrClientPath = path.resolve('../../client/ssr-dist/client.cjs')

  // app.use('/api', dbapi)
  app.post('/api/auth-user', updateUser)
  app.put('/api/update-theme', updateTheme)
  app.get('/sw.js', (_, res) => {
    res.sendFile(path.resolve(swPath, 'sw.js'))
  })

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

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

  app.listen(serverPort, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`)
  })
}

startServer()
