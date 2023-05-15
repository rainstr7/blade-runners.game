import { EnemyParams, GameObject } from './types'

class Enemy implements GameObject {
  x: number
  y: number
  height: number
  width: number
  isAlive: boolean

  private readonly gameWidth: number
  private readonly gameHeight: number
  private readonly speed: number
  private readonly sprite: HTMLImageElement
  private readonly fps: number
  private readonly maxFrame: number
  private readonly frameInterval: number

  private frameX: number
  private frameTimer: number

  constructor(params: EnemyParams) {
    const { gameWidth, gameHeight, width, height, speed, imageSrc, y } = params

    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.width = width
    this.height = height
    this.x = this.gameWidth
    this.y = y ?? this.gameHeight - this.height
    this.speed = speed
    this.isAlive = true

    this.frameX = 0
    this.maxFrame = 3
    //Скорость обновления анимации
    this.fps = 15
    this.frameTimer = 0
    this.frameInterval = 1000 / this.fps

    this.sprite = new Image()
    this.sprite.src = imageSrc
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.sprite,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update(deltaTime: number): void {
    this.x -= this.speed

    if (this.x < 0 - this.width) {
      this.isAlive = false
    }

    this.updateAnimation(deltaTime)
  }

  private updateAnimation(deltaTime: number): void {
    if (this.frameTimer < this.frameInterval) {
      this.frameTimer += deltaTime
      return
    }

    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    } else {
      this.frameX++
    }

    this.frameTimer = 0
  }
}

export default Enemy
