import { DataType } from 'sequelize-typescript'
import { sequelize } from '../init'
import Forum from './forum'

const Topic = sequelize.define(
  'Topic',
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
    messagesCount: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    forumId: {
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

// Topic.belongsTo(Forum)

export default Topic
