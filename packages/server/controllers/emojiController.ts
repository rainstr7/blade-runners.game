import type { Request, Response } from 'express'
import {
  INCORRECT_USER_DATA_REASON,
  NOT_FOUNDED,
  SERVER_ERROR_REASON,
  USER_NOT_FOUNDED,
} from './messages'
import User from '../database/models/User'
import Emoji from '../database/models/Emoji'
import Message from '../database/models/Message'
import { Op } from 'sequelize'

export const addEmoji = async (req: Request, res: Response): Promise<void> => {
  const { messageID, userID, emoji, forumID } = req.body ?? {}
  if (!userID || !messageID || !forumID || !emoji) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const user = await User.findOne({ where: { id: userID } })
    const message = await Message.findOne({ where: { id: messageID } })
    if (user && message) {
      const newEmoji = await Emoji.create({
        emoji,
        userID: user.id,
        messageID: message.id,
        forumID,
      })
      if (newEmoji) {
        res.status(200).send(newEmoji)
      }
    } else {
      res.status(400).json({ reason: USER_NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}

export const delEmoji = async (req: Request, res: Response): Promise<void> => {
  const { messageID, userID, emoji, forumID } = req.body ?? {}
  if (!userID || !messageID || !forumID || !emoji) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const deletedEmoji = await Emoji.findAll({
      where: {
        userID,
        messageID,
        forumID,
        emoji: {
          [Op.eq]: emoji,
        },
      },
    })
    if (deletedEmoji) {
      await deletedEmoji.forEach(emoji => emoji.destroy())
      res.status(200).send(deletedEmoji)
    } else {
      res.status(400).send({ reason: NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}
