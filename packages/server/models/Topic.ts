import { DataType } from 'sequelize-typescript'
import sequelize from '../dbapi'
import Forum from './Forum'

const Topic = sequelize.define('Topic', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  messagesCount: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  forumId: {
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: Forum,
      key: 'id',
    },
  },
})

export default Topic
