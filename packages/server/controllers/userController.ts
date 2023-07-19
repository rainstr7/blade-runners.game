import type { Request, Response } from 'express'
import {
  INCORRECT_USER_DATA_REASON,
  MISSING_BODY_REASON,
  SERVER_ERROR_REASON,
  USER_NOT_FOUNDED,
} from './messages'
import User from '../database/models/User'

export const getTheme = async (req: Request, res: Response): Promise<void> => {
  const { userID } = req.query

  if (!userID) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const currentUser = await User.findOne({ where: { id: userID } })
    if (currentUser !== null) {
      res.status(200).send({ theme: currentUser.theme })
    } else {
      res.status(401).send({ reason: USER_NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ reason: SERVER_ERROR_REASON })
  }
}

export const updateTheme = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body

  if (!body) {
    res.status(400).send(MISSING_BODY_REASON)
  }
  const { id, theme } = body ?? {}

  if (!theme || !id) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const currentUser = await User.findOne({ where: { id } })
    if (currentUser !== null) {
      await User.update({ theme }, { where: { id } })
      res.status(200).send('success')
    } else {
      res.status(401).send({ reason: USER_NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ reason: SERVER_ERROR_REASON })
  }
}
