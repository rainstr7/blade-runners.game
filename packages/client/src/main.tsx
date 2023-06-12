import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { initialServiceWorker } from '../sw/initialServiceWorker'
import create from './utils/createStore'

initialServiceWorker()

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </StrictMode>
// )

const store = create(window.__PRELOADED_STATE__);

// @ts-ignore
delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
