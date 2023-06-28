import type { Request, Response } from 'express'
import Message from '../models/Message'

// Получение всех сообщений для топика по topicId
export const getMessagesByTopicId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { topicId } = req.params
  try {
    const messages = await Message.findAll({ where: { topicId } })
    res.json(messages)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ reason: 'Произошла ошибка при получении сообщений для топика.' })
  }
}

// Получение сообщения по id
export const getMessageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const message = await Message.findByPk(id)
    if (message) {
      res.json(message)
    } else {
      res.status(404).json({ reason: 'Сообщение не найдено.' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ reason: 'Произошла ошибка при получении сообщения.' })
  }
}

// Создание сообщения
export const createMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { author, content, date, emoji } = req.body
  try {
    const message = await Message.create({ author, content, date, emoji })
    res.status(201).json(message)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при создании сообщения.' })
  }
}

// Обновление сообщения
export const updateMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { author, content, date, emoji } = req.body
  try {
    const message = await Message.findByPk(id)
    if (message) {
      await message.update({ author, content, date, emoji })
      res.json(message)
    } else {
      res.status(404).json({ message: 'Сообщение не найдено.' })
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ reason: 'Произошла ошибка при обновлении сообщения.' })
  }
}

// Удаление сообщения
export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const message = await Message.findByPk(id)
    if (message) {
      await message.destroy()
      res.json({ reason: 'Сообщение успешно удалено.' })
    } else {
      res.status(404).json({ reason: 'Сообщение не найдено.' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при удалении сообщения.' })
  }
}
