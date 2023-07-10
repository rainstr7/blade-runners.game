import type { Request, Response } from 'express'
// import { Topic } from '../database/models/topic'
import Topic from '../database/models/Topic'

// Получение всех тем
export const getAllTopics = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const topics = await Topic.findAll()
    res.json(topics)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при получении тем.' })
  }
}

// Получение всех тем для одного форума
export const getTopicsByForumId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { forumId } = req.params
  try {
    const topics = await Topic.findAll({ where: { forumId } })
    res.json(topics)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ reason: 'Произошла ошибка при получении тем для форума.' })
  }
}

// Получение темы по id
export const getTopicById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const topic = await Topic.findByPk(id)
    if (!topic) {
      res.status(404).json({ reason: 'Тема не найдена.' })
      return
    }
    res.json(topic)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при получении темы.' })
  }
}

// Создание темы
export const createTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, forumId } = req.body
  try {
    const topic = await Topic.create({ title, forumId })
    res.status(201).json(topic)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при создании темы.' })
  }
}

// Обновление темы по id
export const updateTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { title, forumId } = req.body
  try {
    const topic = await Topic.findByPk(id)
    if (!topic) {
      res.status(404).json({ reason: 'Тема не найдена.' })
      return
    }
    await topic.update({ title, forumId })
    res.json(topic)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при обновлении темы.' })
  }
}

// Удаление темы по id
export const deleteTopic = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const topic = await Topic.findByPk(id)
    if (!topic) {
      res.status(404).json({ reason: 'Тема не найдена.' })
      return
    }
    await topic.destroy()
    res.json({ reason: 'Тема успешно удалена.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при удалении темы.' })
  }
}
