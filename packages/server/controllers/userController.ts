import type { Request, Response } from 'express'
import User from '../database/models/user'
import { INCORRECT_USER_DATA_REASON, MISSING_BODY_REASON, SERVER_ERROR_REASON, USER_NOT_FOUNDED } from './messages'

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body
  console.log('req test', req)
  console.log('Cookies test: ', req.cookies)
  console.log('Cookies test uuid: ', req.cookies.uuid)
  console.log('body', body)
  if (!body) {
    res.status(400).send(MISSING_BODY_REASON)
  }
  const { id, first_name, second_name, display_name, avatar, email, phone, login } = body ?? {}

  if (!login || !id) {
    res.status(400).send({ reason: INCORRECT_USER_DATA_REASON })
  }
  try {
    const [currentUser] = await User.findOrCreate({
      where: { userID: id },
      defaults: {
        userID: id,
        display_name,
        first_name,
        second_name,
        email,
        login,
        phone,
        avatar
      }
    })
    res.json(currentUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: SERVER_ERROR_REASON })
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
    const currentUser = await User.findOne(
      { where: { userID: id } }
    )
    if (currentUser !== null) {
      await User.update(
        { theme },
        { where: { userID: id } })
      res.status(200).send('success')
    } else {
      res.status(401).send({ reason: USER_NOT_FOUNDED })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ reason: SERVER_ERROR_REASON })
  }
}
