import App from './App'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const appContent = 'BY blade runners'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})
