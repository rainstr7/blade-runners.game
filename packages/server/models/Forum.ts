import { DataType } from 'sequelize-typescript'
import sequelize from '../dbapi'

const Forum = sequelize.define('Forum', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  topicsCount: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  messagesCount: {
    type: DataType.INTEGER,
    allowNull: false,
  },
})

export default Forum
