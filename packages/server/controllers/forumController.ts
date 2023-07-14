import type { Request, Response } from 'express'
import Forum from '../database/models/forum'
import Topic from '../database/models/topic'

// Получение всех форумов и топиков
export const getAllForumsWithTopics = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const forumsWithTopics = await Forum.findAll({
      include: {
        model: Topic,
      },
    })

    res.json(forumsWithTopics)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при получении форумов.' })
  }
}

// Получение всех форумов
export const getAllForums = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const forums = await Forum.findAll()
    res.json(forums)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при получении форумов.' })
  }
}

// Получение форума по id
export const getForumById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  console.log(req.params)
  try {
    const forum = await Forum.findByPk(id)
    if (!forum) {
      res.status(404).json({ reason: 'Форум не найден.' })
      return
    }
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при получении форума.' })
  }
}
// Получение форума по id c топиками
export const getForumByIdWithTpoics = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.params)
  const { id } = req.params
  try {
    const forum = await Forum.findOne({
      where: { id: id },
      include: { model: Topic },
    })
    if (!forum) {
      res.status(404).json({ reason: 'Форум не найден.' })
      return
    }
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при получении форума.' })
  }
}
// Удаление форума по id
export const deleteForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log('BODY ', req.body)
  const { id } = req.params
  try {
    const forum = await Forum.findByPk(id)
    if (!forum) {
      res.status(404).json({ reason: 'Форум не найден.' })
      return
    }
    await forum.destroy()
    res.json({ reason: 'Форум успешно удален.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при удалении форума.' })
  }
}

// Создание форума
export const createForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log('BODY ', req.body)
  const { title, topicsCount, messagesCount } = req.body
  try {
    const forum = await Forum.create({ title, topicsCount, messagesCount })
    res.status(201).json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при создании форума.' })
  }
}

// Обновление форума по id
export const updateForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { title, topicsCount, messagesCount } = req.body
  try {
    const forum = await Forum.findByPk(id)
    if (!forum) {
      res.status(404).json({ reason: 'Форум не найден.' })
      return
    }
    await forum.update({ title, topicsCount, messagesCount })
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ reason: 'Произошла ошибка при обновлении форума.' })
  }
}
