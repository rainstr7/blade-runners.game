import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Button from '.'

const user = userEvent.setup()

describe('Button', () => {
  test('Дэфолтный рендеринг', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toMatchSnapshot('default-button')
  })
  test('Большой размер', () => {
    render(<Button size="large">Click me</Button>)

    expect(screen.getByRole('button')).toMatchSnapshot('large-button')
  })

  test('Маленький размер', () => {
    render(
      <Button data-testid="small-button" size="small">
        Click me
      </Button>
    )

    expect(screen.getByTestId('small-button')).toMatchSnapshot('small-button')
  })
  test('Клик по кнопке', async () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Click me</Button>)
    const button = screen.getByText('Click me')
    await user.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('Текст на кнопке', () => {
    render(<Button data-testid="text-button">Text button</Button>)
    const button = screen.getByTestId('text-button')
    expect(button).toHaveTextContent('Text button')
  })
})
