import { combineReducers } from 'redux'
import layoutReducer from './layoutReducer'

const rootStore = combineReducers({
  layout: layoutReducer
})

export default rootStore
