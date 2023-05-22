import Player, { PlayerParams } from './player'

describe('Player', () => {
  const gameWidth = 800
  const gameHeight = 600
  const height = 50
  const width = 50
  const weight = 0.5

  const params: PlayerParams = {
    gameWidth,
    gameHeight,
    height,
    width,
    weight,
  }

  let player: Player

  beforeEach(() => {
    player = new Player(params)
  })

  test('инициализация параметров игрока', () => {
    expect(player.x).toBe(150)
    expect(player.y).toBe(gameHeight - height)
    expect(player.xV).toBe(0)
    expect(player.yV).toBe(0)
    expect(player.height).toBe(height)
    expect(player.width).toBe(width)
  })

  test('позиционирование игрока при нажатии на Пробел', () => {
    const pressedKeyCodes = ['Space']
    player.update(pressedKeyCodes)

    expect(player.yV).toBe(-20 + weight)
    expect(player.y).toBe(gameHeight - height - 20)
  })

  test('позиционирование игрока в воздухе', () => {
    player.y = gameHeight - height - 10
    player.yV = 5

    player.update([])

    expect(player.yV).toBeGreaterThan(5)
    expect(player.y).toBeGreaterThan(gameHeight - height - 10)
  })

  test('если не нажать Пробел, позиция не должна изменяться', () => {
    const pressedKeyCodes: string[] = []
    player.update(pressedKeyCodes)

    expect(player.yV).toBe(0)
    expect(player.y).toBe(gameHeight - height)
  })
})
