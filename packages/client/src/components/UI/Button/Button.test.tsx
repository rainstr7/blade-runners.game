import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Button from '.'

const user = userEvent.setup()

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toMatchSnapshot('default-button')
  })
  test('renders correctly large', () => {
    render(<Button size="large">Click me</Button>)

    expect(screen.getByRole('button')).toMatchSnapshot('large-button')
  })

  test('size', async () => {
    render(
      <Button data-testid="small-button" size="small">
        Click me
      </Button>
    )
    await screen.getByTestId('small-button')
    expect(screen.getByTestId('small-button')).toMatchSnapshot('small-button')
  })
  test('click', async () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Click me</Button>)
    const button = screen.getByText('Click me')
    await user.click(button)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('text button', () => {
    render(<Button data-testid="text-button">Text button</Button>)
    const button = screen.getByTestId('text-button')
    expect(button).toHaveTextContent('Text button')
  })

  // test('class', async () => {
  //   const { container } = render(
  //     <Button data-testid="small-button" size="small">
  //       Small button
  //     </Button>
  //   )
  //   await screen.getByTestId('small-button')
  //   const btn = container.getElementsByClassName('button')
  //   expect(btn).toBeInTheDocument()
  // })
})