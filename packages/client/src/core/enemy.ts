import { GameObject } from './types'

export interface EnemyParams {
  gameWidth: number
  gameHeight: number
  width: number
  height: number
  speed: number
}

class Enemy implements GameObject {
  x: number
  y: number
  height: number
  width: number
  isAlive: boolean

  private readonly gameWidth: number
  private readonly gameHeight: number
  private readonly speed: number

  constructor(params: EnemyParams) {
    const { gameWidth, gameHeight, width, height, speed } = params

    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.width = width
    this.height = height
    this.x = this.gameWidth
    this.y = this.gameHeight - this.height
    this.speed = speed
    this.isAlive = true
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update(): void {
    this.x -= this.speed

    if (this.x < 0 - this.width) {
      this.isAlive = false;
    }
  }
}

export default Enemy
