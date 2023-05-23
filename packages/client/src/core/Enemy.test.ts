import Enemy from './enemy'
import { EnemyParams } from './types'

describe('Enemy', () => {
  const gameWidth = 800
  const gameHeight = 600
  const width = 50
  const height = 50
  const speed = 5
  const imageSrc = '../assets/enemy3.png'

  const params: EnemyParams = {
    gameWidth,
    gameHeight,
    width,
    height,
    speed,
    imageSrc,
  }

  let enemy: Enemy

  beforeEach(() => {
    enemy = new Enemy(params)
  })

  test('инициализация параметров врага', () => {
    expect(enemy.x).toBe(gameWidth)
    expect(enemy.y).toBe(gameHeight - height)
    expect(enemy.width).toBe(width)
    expect(enemy.height).toBe(height)
    expect(enemy.isAlive).toBe(true)
  })

  test('позиционирование врага', () => {
    enemy.update(1)

    expect(enemy.x).toBe(gameWidth - speed)
  })

  test('жизненный цикл врага', () => {
    enemy.x = -width - 10
    enemy.update(1)

    expect(enemy.isAlive).toBe(false)
  })
})
