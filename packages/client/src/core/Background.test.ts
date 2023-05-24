import Background from './background'
import { BackgroundParams } from './types'

enum bgParams {
  x = 'x',
  y = 'y',
  width = 'width',
  height = 'height',
  speed = 'speed',
  image = 'image',
}

const anyPositiveNumber = 3

describe('Background', () => {
  const gameWidth = 800
  const gameHeight = 600
  const source = 'background.jpg'
  const speed = 3

  const params: BackgroundParams = {
    gameWidth,
    gameHeight,
    source,
    speed,
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
    expect(background[bgParams.speed]).toBe(speed)
  })

  test('корректная отрисовка', () => {
    const ctx: any = {
      drawImage: jest.fn(),
    }

    background.draw(ctx)

    expect(ctx.drawImage).toHaveBeenCalledTimes(2)
    expect(ctx.drawImage).toHaveBeenCalledWith(
      background[bgParams.image],
      background[bgParams.x],
      background[bgParams.y],
      background[bgParams.width],
      background[bgParams.height]
    )
    expect(ctx.drawImage).toHaveBeenCalledWith(
      background[bgParams.image],
      background[bgParams.x] + background[bgParams.width],
      background[bgParams.y],
      background[bgParams.width],
      background[bgParams.height]
    )
  })

  test('позиционирование бэкграунда', () => {
    background.update()

    expect(background[bgParams.x]).toBe(-speed)
  })

  test('сброс позиции при оффскрине', () => {
    background[bgParams.x] = -gameWidth - anyPositiveNumber
    background.update()

    expect(background[bgParams.x]).toBe(0)
  })
})
