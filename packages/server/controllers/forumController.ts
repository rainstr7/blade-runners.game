import type { Request, Response } from 'express'
import Forum from '../models/Forum'

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
    res.status(500).json({ message: 'Произошла ошибка при получении форумов.' })
  }
}

// Получение форума по id
export const getForumById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const forum = await Forum.findByPk(id)
    if (!forum) {
      res.status(404).json({ message: 'Форум не найден.' })
      return
    }
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Произошла ошибка при получении форума.' })
  }
}

// Удаление форума по id
export const deleteForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  try {
    const forum = await Forum.findByPk(id)
    if (!forum) {
      res.status(404).json({ message: 'Форум не найден.' })
      return
    }
    await forum.destroy()
    res.json({ message: 'Форум успешно удален.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Произошла ошибка при удалении форума.' })
  }
}

// Создание форума
export const createForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, trends, comms } = req.body
  try {
    const forum = await Forum.create({ title, trends, comms })
    res.status(201).json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Произошла ошибка при создании форума.' })
  }
}

// Обновление форума по id
export const updateForum = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { title, trends, comms } = req.body
  try {
    const forum = await Forum.findByPk(id)
    if (!forum) {
      res.status(404).json({ message: 'Форум не найден.' })
      return
    }
    await forum.update({ title, trends, comms })
    res.json(forum)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Произошла ошибка при обновлении форума.' })
  }
}
