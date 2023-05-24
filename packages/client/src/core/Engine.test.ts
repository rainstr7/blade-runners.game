import { Engine } from './engine'

function simulateKeyUp(engine: Engine) {
  const event = new KeyboardEvent('keyup', {
    code: 'Space',
  })
  engine.handleKeyUp(event)
}

function simulateKeyDown(engine: Engine) {
  const event = new KeyboardEvent('keydown', {
    code: 'Space',
  })
  engine.handleKeyDown(event)
}

describe('Engine', () => {
  let engine: Engine

  beforeEach(() => {
    engine = new Engine(800, 600)
  })

  test('вызов handleKeyUp', () => {
    const handleKeyUpSpy = jest.spyOn(engine, 'handleKeyUp')

    simulateKeyUp(engine)

    expect(handleKeyUpSpy).toHaveBeenCalledTimes(1)
    expect(handleKeyUpSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent))
  })

  test('вызов handleKeyDown', () => {
    const handleKeyDownSpy = jest.spyOn(engine, 'handleKeyDown')

    simulateKeyDown(engine)

    expect(handleKeyDownSpy).toHaveBeenCalledTimes(1)
    expect(handleKeyDownSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent))
  })

  test('gameOver начальное значение false', () => {
    expect(engine.gameOver).toBe(false)
  })

  test('gameOver сеттер меняет значение и геттер возвращает корректное', () => {
    engine.gameOver = true
    expect(engine.gameOver).toBe(true)
  })
})
