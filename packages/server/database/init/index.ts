import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import User from '../models/User'
import Forum from '../models/Forum'
import Message from '../models/Message'
import Emoji from '../models/Emoji'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [Forum, User, Message, Emoji],
}

export const sequelize = new Sequelize(sequelizeOptions)

User.hasMany(Forum, { foreignKey: 'userID' })
Forum.belongsTo(User, { foreignKey: 'userID' })

User.hasMany(Message, { foreignKey: 'userID' })
Message.belongsTo(User, { foreignKey: 'userID' })

Message.belongsTo(Forum, { foreignKey: 'forumID' })
Forum.hasMany(Message, { foreignKey: 'forumID' })

// Message.hasMany(Emoji, { foreignKey: 'messageID'})
// Emoji.belongsTo(Message, { foreignKey: 'messageID'});

// Forum.hasMany(Emoji, { foreignKey: 'forumID'});
// User.hasMany(Emoji, { foreignKey: 'userID' });

// Emoji.belongsTo(Forum, { foreignKey: 'forumID'});
// Emoji.belongsTo(User, { foreignKey: 'userID'});

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log(
      `Connection has been established successfully with options ${JSON.stringify(
        sequelizeOptions,
        null,
        2
      )}`
    )
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
