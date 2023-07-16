import { updateTheme, updateUser } from './controllers/userController'
import express from 'express'
import { addForum, delForum, getForums } from './controllers/forumController'
import {
  addMessage,
  delMessage,
  getMessages,
} from './controllers/messageController'
import { addEmoji } from './controllers/emojiController'

const routesAPI = express.Router()

routesAPI.get('/forums', getForums)
routesAPI.post('/forums', addForum)
routesAPI.delete('/forums', delForum)

routesAPI.get('/messages', getMessages)
routesAPI.post('/messages', addMessage)
routesAPI.delete('/messages', delMessage)

routesAPI.post('/emoji', addEmoji)

routesAPI.post('/auth-user', updateUser)

routesAPI.put('/update-theme', updateTheme)

module.exports = routesAPI
