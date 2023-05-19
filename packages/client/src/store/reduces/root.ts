import { combineReducers } from 'redux'
import layoutReducer from './layoutReducer'
import scoreReducer from './scoreReducer'

const rootStore = combineReducers({
  layout: layoutReducer,
  score: scoreReducer
})

export default rootStore
