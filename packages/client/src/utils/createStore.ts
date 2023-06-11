import { combineReducers, createStore } from 'redux'
import scoreReducer from '../store/reduces/scoreReducer'

const reducer = combineReducers({ scoreReducer })

function create(initialState?: any) {
  return createStore(reducer, initialState)
}

export default create
