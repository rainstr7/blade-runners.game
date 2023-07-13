import { sequelize } from '../init'
import { DataType } from 'sequelize-typescript'

const User = sequelize.define(
  'User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userID: {
      type: DataType.INTEGER,
      allowNull: false
    },
    first_name: {
      type: DataType.STRING,
      allowNull: false
    },
    second_name: {
      type: DataType.STRING,
      allowNull: false
    },
    display_name: {
      type: DataType.STRING,
      allowNull: false
    },
    login: {
      type: DataType.STRING,
      allowNull: false
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    phone: {
      type: DataType.STRING,
      allowNull: false
    },
    avatar: {
      type: DataType.STRING,
      allowNull: true
    },
    theme: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: 'dark',
    }
  }
)

export default User
