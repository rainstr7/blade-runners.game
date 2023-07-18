import type { Request, Response } from 'express'
import {
  INCORRECT_USER_DATA_REASON,
  SERVER_ERROR_REASON,
  USER_NOT_FOUNDED,
} from './messages'
import Forum from '../database/models/Forum'
import User from '../database/models/User'
import Message from '../database/models/Message'
import Emoji from '../database/models/Emoji'

export const addForum = async (req: Request, res: Response): Promise<void> => {
  const { title, userID } = req.body ?? {}
  if (!userID || !title) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const user = await User.findOne({ where: { id: userID } })
    if (user) {
      const forum = await Forum.create({
        title,
        userID: user.id,
        messagesCount: 0,
      })
      if (forum) {
        res.status(200).send(forum)
      }
    } else {
      res.status(400).json({ reason: USER_NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}

export const delForum = async (req: Request, res: Response): Promise<void> => {
  const { forumID, userID } = req.body ?? {}
  if (!forumID || !userID) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const deletedEmoji = await Emoji.findAll({
      where: { forumID },
    })
    const deletedMessages = await Message.findAll({
      where: { forumID },
    })
    await deletedEmoji.forEach(emoji => emoji.destroy())
    await deletedMessages.forEach(message => message.destroy())
    await Forum.destroy({
      where: { id: forumID },
    })
    const forums = await Forum.findAll()
    res.status(200).send(forums || [])
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}

export const getForums = async (_: Request, res: Response): Promise<void> => {
  try {
    const forums = await Forum.findAll()

    if (forums) {
      res.status(200).send(forums)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}
