import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App-ssr'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <App />
  </StrictMode>
)
