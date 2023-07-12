import { Router } from 'express'
import {
  getAllForums,
  getAllForumsWithTopics,
  getForumById,
  createForum,
  getForumByIdWithTpoics,
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
  .get('/get-forumtop', getForumByIdWithTpoics)
  .get('/get-forum', getForumById)
  .post('/new-forum', createForum)

  .get('/get-topics', getTopicsByForumId)
  .post('/new-topic', createTopic)

  .get('/get-messages', getMessagesByTopicId)
  .post('/new-message', createMessage)
  .put('/update-message', updateMessage)
  .delete('/delete-message', deleteMessage)
