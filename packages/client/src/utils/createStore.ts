import { createStore } from 'redux'
import rootStore from '../store/reduces/root'

const reducer = rootStore

function create(initialState?: any) {
  return createStore(reducer, initialState)
}

export default create
