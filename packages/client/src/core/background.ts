export interface BackgroundParams {
  gameWidth: number
  gameHeight: number
  source: string
  speed: number
}

class Background {
  private x: number
  private readonly image: HTMLImageElement
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private readonly speed: number

  constructor(params: BackgroundParams) {
    const { gameWidth, gameHeight, source, speed } = params

    this.image = new Image()
    this.image.src = source

    this.x = 0
    this.y = 0
    this.width = gameWidth
    this.height = gameHeight
    this.speed = speed
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }

  update(): void {
    this.x -= this.speed
    if (this.x < 0 - this.width) {
      this.x = 0
    }
  }
}

export default Background
