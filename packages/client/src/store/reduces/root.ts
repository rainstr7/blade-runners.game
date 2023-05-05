import { CombinedState, combineReducers } from 'redux'
import layoutReducer from './layoutReducer'
import { IRootStore } from './interfaces'
import { Reducer } from 'react'

const rootStore: Reducer<CombinedState<IRootStore>, any> = combineReducers({
  layout: layoutReducer,
})

export default rootStore
