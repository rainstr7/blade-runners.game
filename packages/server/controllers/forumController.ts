import type { Request, Response } from 'express'
import Forum from '../database/models/forum'
import { INCORRECT_USER_DATA_REASON, SERVER_ERROR_REASON } from './messages'

export const addForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, userID } = req.body ?? {}
  if (!userID || !title) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const forum = await Forum.create({ title, authorID: userID })
    if (forum) {
      res.status(200).send(forum)
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}

export const delForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { forumID, userID } = req.body ?? {}
  if (!forumID || !userID) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
     await Forum.destroy({
      where: {id: forumID}
    })
    const forums = await Forum.findAll()
    if (forums) {
      res.status(200).send(forums)
    }

  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
  }
}

export const getForums = async (
  _: Request,
  res: Response
): Promise<void> => {
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
