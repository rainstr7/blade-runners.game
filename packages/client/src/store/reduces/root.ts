import { combineReducers } from 'redux'
import layoutReducer from './layoutReducer'
import authReducer from './authReducer'

const rootStore = combineReducers({
  layout: layoutReducer,
  auth: authReducer,
})

export default rootStore
