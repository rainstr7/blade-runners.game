import { combineReducers } from 'redux'
import userReducer from './userReducer'
import scoreReducer from './scoreReducer'
import alertReducer from './alertReducer'
import loaderReducer from './loaderReducer'
import forumReducer from './forumReducer'

const rootStore = combineReducers({
  score: scoreReducer,
  user: userReducer,
  alert: alertReducer,
  loading: loaderReducer,
  forum: forumReducer,
})

export default rootStore
