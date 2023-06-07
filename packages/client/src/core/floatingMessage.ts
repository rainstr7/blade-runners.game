import GameText from './GameText/gameText'

export class FloatingMessage {
  private readonly message: string
  private x: number
  private y: number
  private readonly targetX: number
  private readonly targetY: number
  private timer: number
  private readonly speedModifier: number

  isAlive: boolean

  constructor(
    message: string,
    x: number,
    y: number,
    targetX: number,
    targetY: number
  ) {
    this.message = message
    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY
    this.timer = 0
    this.isAlive = true
    this.speedModifier = 0.01
  }

  update(): void {
    this.x += (this.targetX - this.x) * this.speedModifier
    this.y += (this.targetY - this.y) * this.speedModifier

    this.timer++
    if (this.timer > 150) {
      this.isAlive = false
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    GameText.displayText({
      x: this.x,
      y: this.y,
      text: this.message,
      ctx,
      fontSize: 30,
      fillStyle: '#fff',
      shadowColor: '#000'
    })
  }
}
