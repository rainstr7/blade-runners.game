import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'Message',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  paranoid: false,
})
class Message extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined

  @AllowNull(false)
  @Length({ max: 999, min: 1 })
  @Column(DataType.STRING(1000))
  message: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userID: number | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  forumID: number | undefined
}

export default Message
