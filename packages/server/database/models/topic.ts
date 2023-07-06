import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Forum } from './forum'


@Table({
    tableName: 'topics',
    timestamps: false,
})

export class Topic extends Model<Topic> {
    @PrimaryKey
    @AutoIncrement
  @Column(DataType.INTEGER)
  topicId: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string | undefined

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  messagesCount: number | undefined

  @AllowNull(false)
  @ForeignKey(() => Forum)
  @Column(DataType.INTEGER)
  forumId: number | undefined
}


