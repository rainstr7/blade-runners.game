import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'Forum',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  paranoid: false,
})
class Forum extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined

  @AllowNull(false)
  @Column(DataType.STRING(300))
  title: string | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userID: number | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  messagesCount: number | undefined
}

export default Forum
