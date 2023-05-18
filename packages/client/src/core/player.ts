import { GameObject, PlayerParams } from './types'
import { FallingState, JumpingState, PlayerStates, RunningState, State } from './playerStates'

class Player implements GameObject {
  x: number
  y: number
  yV: number
  height: number
  width: number

  private frameX: number
  frameY: number
  private frameTimer: number

  private readonly maxFrame: number
  private _animationSpeed: number
  private readonly frameInterval: number

  private readonly runImage: HTMLImageElement
  readonly weight: number
  private readonly gameHeight: number
  private readonly gameWidth: number
  readonly jumpForce: number

  private readonly states: State[]
  private currentState: State

  get animationSpeed(): number {
    return this._animationSpeed
  }

  set animationSpeed(value: number) {
    this._animationSpeed = value
  }

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
    this._animationSpeed = 15
    this.frameTimer = 0
    this.frameInterval = 1000 / this._animationSpeed

    this.runImage = new Image()
    this.runImage.src = imageSrc

    // В данный момент зависит от порядка enum PlayerStates, в обьект?
    this.states = [new RunningState(this), new JumpingState(this), new FallingState(this)]
    this.currentState = this.states[PlayerStates.RUNNING]
    this.currentState.init()
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
    this.currentState.handleState(pressedKeyCodes)

    this.y += this.yV

    if (!this.onGround()) {
      this.yV += this.weight
    } else {
      this.yV = 0
    }

    this.updateAnimation(deltaTime)
  }

  setState(state: PlayerStates) {
    this.currentState = this.states[state]
    this.currentState.init()
  }

  onGround(): boolean {
    return this.y >= this.gameHeight - this.height
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
}

export default Player
