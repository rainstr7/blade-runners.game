import Background, { BackgroundParams } from './background'

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
    expect(background['x']).toBe(0)
    expect(background['y']).toBe(0)
    expect(background['width']).toBe(gameWidth)
    expect(background['height']).toBe(gameHeight)
    expect(background['speed']).toBe(speed)
  })

  test('корректная отрисовка', () => {
    const ctx: any = {
      drawImage: jest.fn(),
    }

    background.draw(ctx)

    expect(ctx.drawImage).toHaveBeenCalledTimes(2)
    expect(ctx.drawImage).toHaveBeenCalledWith(
      background['image'],
      background['x'],
      background['y'],
      background['width'],
      background['height']
    )
    expect(ctx.drawImage).toHaveBeenCalledWith(
      background['image'],
      background['x'] + background['width'],
      background['y'],
      background['width'],
      background['height']
    )
  })

  test('позиционирование бэкграунда', () => {
    background.update()

    expect(background['x']).toBe(-speed)
  })

  test('сброс позиции при оффскрине', () => {
    background['x'] = -gameWidth - 10
    background.update()

    expect(background['x']).toBe(0)
  })
})
