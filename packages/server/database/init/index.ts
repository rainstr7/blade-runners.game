import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
// import { Forum } from '../models/forum'
// import Forum from '../../models/Forum'

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } =
//   process.env

const sequelizeOptions: SequelizeOptions = {
  // host: POSTGRES_HOST,
  port: 5450,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres',
  // models: ['../models'],
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
// export const forum = sequelize.define('Forums', Forum, {})

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync({ force: true }) // Синхронизация базы данных
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
