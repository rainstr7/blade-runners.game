import { Router } from 'express'
import {
  getAllForums,
  getAllForumsWithTopics,
  getForumById,
  createForum,
} from './controllers/forumController'
import { getTopicsByForumId, createTopic } from './controllers/topicController'
import {
  getMessagesByTopicId,
  createMessage,
  updateMessage,
  deleteMessage,
} from './controllers/messageController'

export const dbapi = Router()
  .get('/get-data', getAllForumsWithTopics)

  .get('/get-forums', getAllForums)
  .get('/get-forums/:id', getForumById)
  .post('/new-forum', createForum)

  .get('/get-topics/:id', getTopicsByForumId)
  .post('/new-topic', createTopic)

  .get('/get-message/:topicId', getMessagesByTopicId)
  .post('/new-message', createMessage)
  .put('/update-message/:id', updateMessage)
  .delete('/delete-message/:id', deleteMessage)

  // .post('/auth-user', addNewUser)
