import { BackgroundParams, LayerParams } from './types'

class Layer {
  private readonly gameSpeed: number
  private readonly gameWidth: number
  private readonly gameHeight: number
  private readonly speedModifier: number
  private readonly image: HTMLImageElement
  private x = 0
  private y = 0

  constructor(layerParams: LayerParams) {
    const { gameSpeed, gameWidth, gameHeight, speedModifier, image } = layerParams

    this.gameSpeed = gameSpeed
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.speedModifier = speedModifier
    this.image = image
  }

  update(): void {
    this.x -= this.gameSpeed * this.speedModifier
    if (this.x < 0 - this.gameWidth) {
      this.x = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y, this.gameWidth, this.gameHeight)
    ctx.drawImage(
      this.image,
      this.x + this.gameWidth,
      this.y,
      this.gameWidth,
      this.gameHeight
    )
  }
}

class Background {
  private x: number
  private readonly y: number
  private readonly width: number
  private readonly height: number
  private _speed: number

  private layers: Layer[] = []

  constructor(params: BackgroundParams) {
    const { gameWidth, gameHeight, gameSpeed, sources } = params
    this.x = 0
    this.y = 0
    this.width = gameWidth
    this.height = gameHeight
    this._speed = gameSpeed

    let speedModifier = 0

    this.layers = sources.map(source => {
      const image = new Image()
      image.src = source

      speedModifier += 0.2

      return new Layer({ gameSpeed, gameWidth, gameHeight, speedModifier, image })
    })
  }

  update(): void {
    this.layers.forEach(layer => {
      layer.update()
    })
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.layers.forEach(layer => {
      layer.draw(ctx)
    })
  }
}

export default Background
