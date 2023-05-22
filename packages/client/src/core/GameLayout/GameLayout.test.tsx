import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GameLayout from '.'
import { Engine } from '../engine'

jest.mock('../engine', () => {
  const mockHandleKeyUp = jest.fn()
  const mockHandleKeyDown = jest.fn()
  const mockGame = jest.fn()

  return {
    Engine: jest.fn().mockImplementation(() => {
      return {
        handleKeyDown: mockHandleKeyDown,
        handleKeyUp: mockHandleKeyUp,
        game: mockGame,
        gameOver: false,
      }
    }),
  }
})

// const getGameOverMock = jest.spyOn(Engine.prototype, 'gameOver', 'get')

test('test mock', () => {
  const { container } = render(<GameLayout />)
  expect(container).toMatchSnapshot()
})
// test('test game', () => {
//   const setGameOverMock = jest.spyOn(Engine.prototype, 'gameOver', 'set')
//   render(<GameLayout />)
//   expect(setGameOverMock).toHaveBeenCalled()
//   setGameOverMock.mockClear
// })
test('test game', () => {
  render(<GameLayout />)
  userEvent.keyboard('Space')
  expect(jest.spyOn(Engine.prototype, 'handleKeyUp')).toHaveBeenCalled()
  // getGameOverMock.mockClear
})