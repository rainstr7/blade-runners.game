import Player from './player'
import { PlayerParams } from './types'

describe('Player', () => {
  const gameWidth = 800
  const gameHeight = 600
  const height = 50
  const width = 50
  const weight = 0.5
  const imageSrc = '../assets/hero_run.png'

  const params: PlayerParams = {
    gameWidth,
    gameHeight,
    height,
    width,
    weight,
    imageSrc,
  }

  let player: Player

  beforeEach(() => {
    player = new Player(params)
  })

  test('инициализация параметров игрока', () => {
    expect(player.x).toBe(150)
    expect(player.y).toBe(gameHeight - height)
    expect(player.yV).toBe(20)
    expect(player.height).toBe(height)
    expect(player.width).toBe(width)
  })

  test('позиционирование игрока в воздухе', () => {
    player.y = gameHeight - height - 10
    player.yV = 5

    player.update({ Space: 'up', Enter: 'down' }, 1)

    expect(player.yV).toBeGreaterThan(5)
    expect(player.y).toBeGreaterThan(gameHeight - height - 10)
  })
})
