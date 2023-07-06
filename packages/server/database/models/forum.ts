import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'forums',
  timestamps: false,
})
export class Forum extends Model<Forum> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  forumid: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string | undefined

  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  topicsCount: number | undefined
  
  // @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  messagesCount: number | undefined
}
