// import {
//   getAllForums,
//   getAllForumsWithTopics,
//   getForumById,
//   createForum
// } from './controllers/forumController'
// import { getTopicsByForumId, createTopic } from './controllers/topicController'
// import {
//   getMessagesByTopicId,
//   createMessage,
//   updateMessage,
//   deleteMessage
// } from './controllers/messageController'
import { updateTheme, updateUser } from './controllers/userController'
import express from 'express'
import { addForum, delForum, getForums } from './controllers/forumController'

const routesAPI = express.Router()

// router.get('/get-data', getAllForumsWithTopics)
routesAPI.get('/forums', getForums)
// router.get('/get-forums/:id', getForumById)
routesAPI.post('/forums', addForum)
routesAPI.delete('/forums', delForum)
// router.get('/get-topics/:id', getTopicsByForumId)
// router.post('/new-topic', createTopic)
// router.get('/get-message/:topicId', getMessagesByTopicId)
// router.post('/new-message', createMessage)
// router.put('/update-message/:id', updateMessage)
// router.delete('/delete-message/:id', deleteMessage)

routesAPI.post('/auth-user', updateUser)
routesAPI.put('/update-theme', updateTheme)


module.exports = routesAPI
