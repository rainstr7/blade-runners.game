import { render } from '@testing-library/react'
import GameLayout from '.'

test('корректный рендеринг GameLayout', () => {
  const { container } = render(<GameLayout />)

  expect(container).toMatchSnapshot()
})
