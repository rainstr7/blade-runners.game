import { DataType } from 'sequelize-typescript'
import { sequelize } from '../init'

const Forum = sequelize.define(
  'Forum',
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
    },
    authorID: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    messagesCount: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
)

export default Forum
