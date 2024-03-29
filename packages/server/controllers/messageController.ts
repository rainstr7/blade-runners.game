import type { Request, Response } from 'express'
import {
  INCORRECT_USER_DATA_REASON,
  SERVER_ERROR_REASON,
  USER_NOT_FOUNDED,
} from './messages'
import { sequelize } from '../database/init'
import Forum from '../database/models/Forum'
import User from '../database/models/User'
import Message from '../database/models/Message'
import Emoji from '../database/models/Emoji'

const getMessagesSQLQuery = (forumID: number) => `
 select m.id, m."createdAt" , avatar, message, display_name, jsonb_agg(emoji) emoji from public."Message" m
    join public."User" u on m."userID"=u.id
    left join public."Emoji" e on e."messageID"=m.id
    where m."forumID"=${forumID}
    group by m.id, m."createdAt", avatar, message, display_name
`

export const addMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { forumID, userID, message } = req.body ?? {}

  if (!forumID || !userID || !message) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }

  try {
    const user = await User.findOne({ where: { id: userID } })
    const forum = await Forum.findOne({ where: { id: forumID } })
    if (user && forum) {
      const newMessage = await Message.create({
        message,
        userID: user.id,
        forumID: forum.id,
      })
      if (newMessage) {
        newMessage.dataValues.avatar = user.avatar
        newMessage.dataValues.display_name = user.display_name
        newMessage.dataValues.emoji = []

        await forum.set({ messagesCount: forum.dataValues.messagesCount + 1 })
        await forum.save()
        res.status(200).json(newMessage)
      }
    } else {
      res.status(400).send({ reason: USER_NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { forumID } = req.query
  try {
    if (forumID) {
      const [messages] = await sequelize.query(getMessagesSQLQuery(+forumID))
      res.status(200).send(messages)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ reason: SERVER_ERROR_REASON })
  }
}

export const delMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { messageID, forumID, userID } = req.body ?? {}

  if (!messageID || !forumID || !userID) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const deletedEmoji = await Emoji.findAll({
      where: { forumID, messageID },
    })
    await deletedEmoji.forEach(emoji => emoji.destroy())

    await Message.destroy({
      where: { id: messageID, forumID },
    })

    const [messages] = await sequelize.query(getMessagesSQLQuery(+forumID))
    if (messages) {
      const forum = await Forum.findOne({ where: { id: forumID } })
      if (forum) {
        await forum.set({ messagesCount: forum.dataValues.messagesCount - 1 })
        await forum.save()
        res.status(200).send(messages)
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}
