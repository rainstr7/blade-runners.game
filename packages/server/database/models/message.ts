import {Topic} from './topic'
import { DataType, Model, Column, Table, ForeignKey, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'messages',
    timestamps: false
})
export class Message extends Model<Message> {
    @PrimaryKey
    @AutoIncrement
  @Column(DataType.INTEGER)
  messageid: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  author: string | undefined
  
  @AllowNull(false)
  @Column(DataType.STRING)
  content: string | undefined
  
  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date | undefined
  
  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topicid: number | undefined
}

