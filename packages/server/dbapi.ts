// import Forum from './models/Forum'
import dotenv from 'dotenv'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

dotenv.config()

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  // models: [Forum]
}
export const sequelize = new Sequelize(sequelizeOptions)

export const connectToDB = async () => {
  
  try {
    await sequelize.authenticate()
    console.log('Connected to DB')
    return sequelize
    // const forums = await Forum.findAll()
    // console.log('FORUMS : ', forums)

    // await sequelize.close()
    // console.log('Conecction close')
  } catch (error) {
    console.error('Cant connect to DB ', error)
  }
  return null
}

// export default connectToDB
