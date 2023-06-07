import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './src/App-ssr'

export function render() {
  return renderToString(<App />)
}
