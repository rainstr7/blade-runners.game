import { DataType } from 'sequelize-typescript'
import { sequelize } from '../database/init'
import Topic from './Topic'

const Message = sequelize.define(
  'Forum',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataType.STRING,
      allowNull: false,
    },
    content: {
      type: DataType.STRING,
      allowNull: false,
    },
    date: {
      type: DataType.DATE,
      allowNull: false,
    },
    topicId: {
      type: DataType.INTEGER,
      allowNull: false,
      references: {
        model: Topic,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
)

export default Message
