// import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { forumModel } from '../models/forum'

// dotenv.config()

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5450,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres',
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
export const Forum = sequelize.define('Forums', forumModel, {})

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
