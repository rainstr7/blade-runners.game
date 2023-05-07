import { applyMiddleware, createStore, Store } from 'redux'
import { IRootStore } from './reduces/interfaces'
import root from './reduces/root'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const store: Store<IRootStore> = createStore(
  root,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
