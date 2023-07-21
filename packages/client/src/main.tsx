import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { initialServiceWorker } from '../sw/initialServiceWorker'
import { create } from './utils/createStore'

initialServiceWorker()

const store = create(window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__

const app = (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

const rootElement = document.getElementById('root') as HTMLElement
if (rootElement.innerHTML === '<!--ssr-outlet-->') {
  ReactDOM.createRoot(rootElement).render(app)
} else {
  ReactDOM.hydrateRoot(rootElement, app)
}
