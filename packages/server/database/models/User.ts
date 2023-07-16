import {
  AllowNull,
  Column,
  DataType,
  IsEmail,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'User',
  timestamps: true,
  createdAt: true,
  updatedAt: false,
  paranoid: false,
})
class User extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id: number | undefined

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  first_name: string | undefined

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  second_name: string | undefined

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  display_name: string | undefined

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  login: string | undefined

  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  email: string | undefined

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  phone: string | undefined

  @AllowNull(false)
  @Length({ max: 100, min: 3 })
  @Column(DataType.STRING)
  avatar: string | undefined

  @AllowNull(false)
  @Length({ max: 20, min: 3 })
  @Column(DataType.STRING)
  theme: string | undefined
}
export default User
