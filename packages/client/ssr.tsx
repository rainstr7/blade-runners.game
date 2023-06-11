import { renderToString } from 'react-dom/server'
import App from './src/App-ssr'
import { Provider } from 'react-redux'

export function render(store) {
  return renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
