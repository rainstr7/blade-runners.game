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
import type { EmojiClickData } from './interfaces'

@Table({
  tableName: 'Emoji',
  timestamps: false,
  paranoid: false,
})
class Emoji extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined

  @AllowNull(true)
  @Length({ max: 999, min: 1 })
  @Column(DataType.JSONB)
  emoji: EmojiClickData | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userID: number | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  messageID: number | undefined

  @AllowNull(false)
  @Column(DataType.INTEGER)
  forumID: number | undefined
}

export default Emoji
