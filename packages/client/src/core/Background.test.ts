import Background from './background'
import { BackgroundParams } from './types'

enum bgParams {
  x = 'x',
  y = 'y',
  width = 'width',
  height = 'height',
  speed = '_speed',
}


describe('Background', () => {
  const gameWidth = 800
  const gameHeight = 600
  const gameSpeed = 3
  const sources = ['bgLayer1', 'bgLayer2', 'bgLayer3', 'bgLayer4', 'bgLayer5']

  const params: BackgroundParams = {
    gameWidth,
    gameHeight,
    sources,
    gameSpeed,
  }

  let background: Background

  beforeEach(() => {
    background = new Background(params)
  })

  test('инициализация с корректными свойствами', () => {
    expect(background[bgParams.x]).toBe(0)
    expect(background[bgParams.y]).toBe(0)
    expect(background[bgParams.width]).toBe(gameWidth)
    expect(background[bgParams.height]).toBe(gameHeight)
    expect(background[bgParams.speed]).toBe(gameSpeed)
  })

  test('позиционирование бэкграунда', () => {
    background.update()

    expect(background[bgParams.x]).toBe(0)
  })
})
