import { Engine } from './engine'

describe('Engine', () => {
  let engine: Engine

  beforeEach(() => {
    engine = new Engine(800, 600)
  })

  test('gameOver начальное значение false', () => {
    expect(engine.gameOver).toBe(false)
  })

  test('gameOver сеттер меняет значение и геттер возвращает корректное', () => {
    engine.gameOver = true
    expect(engine.gameOver).toBe(true)
  })

  test('getScore начальное значение 0', () => {
    expect(engine.getScore).toBe(0)
  })

  test('checkSpeed изменяет параметры скорости', () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    engine['score'] = 5
    engine['checkSpeed'](ctx)
    expect(engine['gameSpeed']).toBe(2)
    expect(engine['enemyInterval']).toBe(1600)

    engine['score'] = 10
    engine['checkSpeed'](ctx)
    expect(engine['gameSpeed']).toBe(2)
    expect(engine['enemyInterval']).toBe(1300)
    })
  })

