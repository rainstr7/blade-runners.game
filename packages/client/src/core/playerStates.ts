import Player from './player'
import { KeyConfiguration } from './types'

export enum PlayerStates {
  RUNNING,
  JUMPING,
  FALLING,
}

export abstract class State {
  private state: PlayerStates
  protected constructor(state: PlayerStates) {
    this.state = state
  }

  abstract init(): void
  abstract handleState(keyConfiguration: KeyConfiguration): void

  abstract update(deltaTime: number): void
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

  handleState(keyConfiguration: KeyConfiguration): void {
     if (keyConfiguration.Space === 'down') {
      this.player.setState(PlayerStates.JUMPING)
    }
  }

  update(deltaTime: number) {
    if (this.player.frameTimer < this.player.frameInterval) {
      this.player.frameTimer += deltaTime
      return
    }

    if (this.player.frameX >= this.player.maxFrame) {
      this.player.frameX = 0
    } else {
      this.player.frameX++
    }

    this.player.frameTimer = 0
  }
}

export class JumpingState extends State {
  private player: Player
  constructor(player: Player) {
    super(PlayerStates.JUMPING)
    this.player = player
  }

  init(): void {
    if (this.player.onGround()) {
      this.player.yV += -this.player.jumpForce
    }

    this.player.frameY = 1
  }

  handleState(keyConfiguration: KeyConfiguration): void {
    if (
      keyConfiguration.Space === 'up' ||
      this.player.yV > this.player.weight
    ) {
      this.player.setState(PlayerStates.FALLING)
    }
  }

  update(deltaTime: number) {
    if (this.player.yV < -this.player.jumpForce / 2) {
      this.player.frameX = 0
    } else {
      this.player.frameX = 1
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
    this.player.yV = 0
  }

  handleState(keyConfiguration: KeyConfiguration): void {
    if (this.player.onGround()) {
      this.player.setState(PlayerStates.RUNNING)
    }
  }

  update(deltaTime: number) {
    if (this.player.yV > 0 && this.player.yV < this.player.jumpForce / 2) {
      this.player.frameX = 0
    } else {
      this.player.frameX = 1
    }
  }
}
