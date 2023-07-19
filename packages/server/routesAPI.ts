import { getTheme, updateTheme } from './controllers/userController'
import express from 'express'
import { addForum, delForum, getForums } from './controllers/forumController'
import {
  addMessage,
  delMessage,
  getMessages,
} from './controllers/messageController'
import { addEmoji, delEmoji } from './controllers/emojiController'
import { checkAuthMiddleware } from './middlewares/checkAuth'
import bodyParser from 'body-parser'

const routesAPI = express.Router()

routesAPI
  .get('/forums', getForums)
  .use('/', checkAuthMiddleware)
  .use(bodyParser.json())
  .post('/forums', addForum)
  .delete('/forums', delForum)

  .get('/messages', getMessages)
  .post('/messages', addMessage)
  .delete('/messages', delMessage)

  .post('/emoji', addEmoji)
  .delete('/emoji', delEmoji)

  .get('/theme', getTheme)
  .put('/theme', updateTheme)

module.exports = routesAPI
