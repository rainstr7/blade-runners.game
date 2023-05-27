import { combineReducers } from 'redux'
import authReducer from './authReducer'
import layoutReducer from './layoutReducer'
import scoreReducer from './scoreReducer'

const rootStore = combineReducers({
  layout: layoutReducer,
  score: scoreReducer,
  auth: authReducer,
})

export default rootStore
