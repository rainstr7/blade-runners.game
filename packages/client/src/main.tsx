import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { applyMiddleware, createStore, Store } from 'redux'
import { Provider } from 'react-redux'
import root from './store/reduces/root'
import { IRootStore } from './store/reduces/interfaces'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store: Store<IRootStore> = createStore(
  root,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
