import { GameObject, PlayerParams } from './types'

class Player implements GameObject {
  x: number
  y: number
  yV: number
  height: number
  width: number

  private frameX: number
  private frameY: number
  private frameTimer: number

  private readonly maxFrame: number
  private readonly fps: number
  private readonly frameInterval: number

  private readonly runImage: HTMLImageElement
  private readonly weight: number
  private readonly gameHeight: number
  private readonly gameWidth: number
  private readonly jumpForce: number

  constructor(params: PlayerParams) {
    const {
      gameWidth,
      gameHeight,
      height,
      width,
      imageSrc,
      weight = 0.5,
    } = params
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.height = height
    this.width = width
    this.x = 150
    this.y = gameHeight - height
    this.yV = 20
    this.weight = weight
    this.jumpForce = 20

    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 5

    //Скорость обновления анимации
    this.fps = 15
    this.frameTimer = 0
    this.frameInterval = 1000 / this.fps

    this.runImage = new Image()
    this.runImage.src = imageSrc
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.runImage,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update(pressedKeyCodes: string[], deltaTime: number): void {
    // TODO более реальный джамп, поидее надо реагировать keyup отдельно чтобы проверять силу прыжка
    if (pressedKeyCodes.includes('Space') && this.onGround()) {
      this.yV = -this.jumpForce
    }

    this.y += this.yV

    if (!this.onGround()) {
      this.yV += this.weight
    } else {
      this.yV = 0
    }

    this.updateAnimation(deltaTime)
  }

  private updateAnimation(deltaTime: number): void {
    if (!this.onGround()) {
      this.renderJumpAnimation()
      return
    }
    this.renderRunAnimation(deltaTime)
  }

  // TODO Поидее это надо в какойнибудь SpriteManager, но пока не придумал как
  private renderRunAnimation(deltaTime: number) {
    this.frameY = 0

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

  private renderJumpAnimation() {
    this.frameY = 1

    if (this.yV < -this.jumpForce / 2) {
      this.frameX = 0
    } else if (this.yV < 0) {
      this.frameX = 1
    } else if (this.yV > 0 && this.yV < this.jumpForce / 2) {
      this.frameX = 2
    } else {
      this.frameX = 3
    }
  }

  private onGround(): boolean {
    return this.y >= this.gameHeight - this.height
  }
}

export default Player
