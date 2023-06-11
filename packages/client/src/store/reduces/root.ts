import { combineReducers } from 'redux'
import userReducer from './userReducer'
import scoreReducer from './scoreReducer'
import alertReducer from './alertReducer'
import loaderReducer from './loaderReducer'

const rootStore = combineReducers({
  score: scoreReducer,
  user: userReducer,
  alert: alertReducer,
  loading: loaderReducer,
})

export default rootStore
