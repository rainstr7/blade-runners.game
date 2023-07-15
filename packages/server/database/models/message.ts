import { DataType } from 'sequelize-typescript'
import { sequelize } from '../init'
import Forum from './forum'

const Message = sequelize.define(
  'Message',
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
        model: Forum,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
)

export default Message
