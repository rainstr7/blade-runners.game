import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IForum {
  id: number
  title: string
  topicsCount: number
  messagesCount: number
}

export const forumModel: ModelAttributes<Model, IForum> = {
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
}
