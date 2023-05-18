import Player from './player'

export enum PlayerStates {
  RUNNING,
  JUMPING,
  FALLING
}

export abstract class State {
  private state: PlayerStates
  protected constructor(state: PlayerStates) {
    this.state = state
  }

  abstract init(): void
  abstract handleState(keys: string[]): void
}

export class RunningState extends State {
  private player: Player
  constructor(player: Player) {
    super(PlayerStates.RUNNING)
    this.player = player
  }

  init(): void {
    this.player.frameY = 0
  }

  handleState(keys: string[]): void {
    console.log('RunningState')

    if (keys.includes('Space')) {
      this.player.setState(PlayerStates.JUMPING)
    }
  }
}

export class JumpingState extends State {
  private player: Player
  constructor(player: Player) {
    super(PlayerStates.JUMPING)
    this.player = player
  }

  init(): void {
    // TODO более реальный джамп, поидее надо реагировать keyup отдельно чтобы проверять силу прыжка
    if (this.player.onGround()) {
      this.player.yV += -this.player.jumpForce
    }

    this.player.frameY = 1
  }

  handleState(keys: string[]): void {
    console.log('JumpingState')

    if (this.player.yV > this.player.weight) {
      this.player.setState(PlayerStates.FALLING)
    }
  }
}

export class FallingState extends State {
  private player: Player
  constructor(player: Player) {
    super(PlayerStates.FALLING)
    this.player = player
  }

  init(): void {
    this.player.frameY = 2
  }

  handleState(keys: string[]): void {
    console.log('FallingState')
    if(this.player.onGround()) {
      this.player.setState(PlayerStates.RUNNING)
    }
  }
}
