import { GameObject, KeyConfiguration, PlayerParams } from './types'
import { FallingState, JumpingState, PlayerStates, RunningState, State } from './playerStates'

class Player implements GameObject {
  x: number
  y: number
  yV: number
  height: number
  width: number

  frameX: number
  frameY: number
  frameTimer: number

  readonly maxFrame: number
  private _animationSpeed: number
  readonly frameInterval: number

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

  update(keyConfiguration: KeyConfiguration, deltaTime: number): void {
    this.currentState.handleState(keyConfiguration)

    this.currentState.update(deltaTime)

    // Куда то надо переместить
    this.y += this.yV
    if (!this.onGround()) {
      this.yV += this.weight
    } else {
      this.yV = 0
    }
  }

  setState(state: PlayerStates) {
    this.currentState = this.states[state]
    this.currentState.init()
  }

  onGround(): boolean {
    return this.y >= this.gameHeight - this.height
  }
 }

export default Player
