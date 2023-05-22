import { EnemyParams, GameObject } from './types'
import { randomFromInterval } from './utils'

export class Enemy implements GameObject{
  private frameX: number
  private frameY: number
  private readonly fps: number
  private readonly frameInterval: number
  private frameTimer: number
  speedX: number
  speedY: number
  x: number
  y: number
  height: number
  width: number
  maxFrame: number
  sprite?: HTMLImageElement
  isAlive: boolean

  constructor(x: number, y: number, width: number, height: number) {
    this.frameX = 0
    this.frameY = 0
    this.fps = 15
    this.frameTimer = 0
    this.frameInterval = 1000 / this.fps

    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.height = height
    this.width = width

    this.maxFrame = 3
    this.isAlive = true
  }

  update(deltaTime: number) {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 - this.width) {
      this.isAlive = false
    }

    this.updateAnimation(deltaTime)
  }

  draw(ctx: CanvasRenderingContext2D) {
    if(!this.sprite) {
      throw new Error('Sprite is not loaded')
    }

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

export class FlyingEnemy extends Enemy {
  private readonly vAngle: number
  private angle: number

  constructor(params: EnemyParams) {
    const {x, y, width, height, gameSpeed, speedModifier, imageSrc} = params
    super(x, y, width, height)
    this.speedX = - (gameSpeed * speedModifier)

    this.sprite = new Image()
    this.sprite.src = imageSrc

    this.angle = 0
    this.vAngle = randomFromInterval(0, 1) * 0.1 + 0.1
  }

  update(deltaTime: number) {
    super.update(deltaTime)

    this.angle += this.vAngle
    this.y += Math.sin(this.angle)
  }
}

export class GroundEnemy extends Enemy {
  constructor(params: EnemyParams)  {
    const {x, y, width, height, gameSpeed, speedModifier, imageSrc} = params
    super(x, y, width, height)
    this.speedX = - (gameSpeed + speedModifier)

    this.sprite = new Image()
    this.sprite.src = imageSrc
  }

  update(deltaTime: number) {
    super.update(deltaTime)
  }
}
