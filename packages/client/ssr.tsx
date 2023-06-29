import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import App from './src/App'
import rootStore from './src/store/reduces/root'
import { createStore } from 'redux'

export function render(store, url) {
  return renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}

const reducer = rootStore

export function create(initialState?: any) {
  return createStore(reducer, initialState)
}
