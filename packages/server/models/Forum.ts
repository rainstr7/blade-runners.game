import { DataType } from 'sequelize-typescript'
// import sequelize from '../dbapi'
import { sequelize } from '../database/init'

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
    topicsCount: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
