import Enemy, { EnemyParams } from './enemy'

describe('Enemy', () => {
  const gameWidth = 800
  const gameHeight = 600
  const width = 50
  const height = 50
  const speed = 5

  const params: EnemyParams = {
    gameWidth,
    gameHeight,
    width,
    height,
    speed,
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

  test('корректное отображение врага', () => {
    const ctx: any = {
      fillStyle: '',
      fillRect: jest.fn(),
    }

    enemy.draw(ctx)

    expect(ctx.fillStyle).toBe('#ff0000')
    expect(ctx.fillRect).toHaveBeenCalledWith(
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height
    )
  })

  test('позиционирование врага', () => {
    enemy.update()

    expect(enemy.x).toBe(gameWidth - speed)
  })

  test('жизненный цикл врага', () => {
    enemy.x = -width - 10
    enemy.update()

    expect(enemy.isAlive).toBe(false)
  })
})
