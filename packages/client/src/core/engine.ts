import Background from './background'
import bg from '../assets/game_bg.png'
import Player from './player'
import Enemy from './enemy'
import GameText from './gameText'
import { calcPosition } from './utils'

export class Engine {
  get gameOver(): boolean {
    return this._gameOver
  }

  set gameOver(value: boolean) {
    this._gameOver = value
  }

  private _gameOver = false
  private score = 0
  private enemies: Enemy[] = []
  private enemyTimer = 0
  private randomEnemyInterval = Math.random() * 1000 + 500
  private pressedKeyCodes: string[] = []

  private readonly enemyInterval = 2000
  private readonly gameHeight: number
  private readonly gameWidth: number
  private readonly background: Background
  private readonly player: Player

  constructor(gameWidth: number, gameHeight: number) {
    this.gameHeight = gameHeight
    this.gameWidth = gameWidth
    this.background = new Background({
      gameWidth: this.gameWidth,
      gameHeight: this.gameHeight,
      source: bg,
      speed: 3,
    })
    this.player = new Player({
      gameWidth: this.gameWidth,
      gameHeight: this.gameHeight,
      height: 100,
      width: 100,
      weight: 0.5,
    })
  }

  game = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.background.draw(ctx)
    this.background.update()

    this.handleEnemy(ctx, deltaTime)

    this.checkCollisions()

    this.player.draw(ctx)
    this.player.update(this.pressedKeyCodes)

    this.displayScore(ctx)

    if (this.gameOver) {
      this.displayGameOver(ctx)
    }
  }

  handleKeyDown = (e: Event) => {
    const keyCode = (e as KeyboardEvent)?.code
    if (
      keyCode &&
      keyCode === 'Space' &&
      !this.pressedKeyCodes.includes(keyCode)
    ) {
      this.pressedKeyCodes.push(keyCode)
    }
  }

  handleKeyUp = (e: Event) => {
    const keyCode = (e as KeyboardEvent)?.code
    if (keyCode && keyCode === 'Space') {
      this.pressedKeyCodes.splice(this.pressedKeyCodes.indexOf(keyCode), 1)
    }
  }

  private displayScore = (ctx: CanvasRenderingContext2D) => {
    GameText.displayText({
      ctx,
      x: 50,
      y: 50,
      text: `Score: ${this.score}`,
      font: 'Helvetica',
      fontSize: 40,
    })
  }

  private displayGameOver = (ctx: CanvasRenderingContext2D) => {
    GameText.displayText({
      ctx,
      x: this.gameWidth / 2 - 100,
      y: this.gameHeight / 2 - 20,
      text: `Game Over`,
      font: 'Helvetica',
      fontSize: 40,
    })
  }

  // TODO сервис? синглтон?
  private checkCollisions = () => {
    const {
      top: playerTop,
      left: playerLeft,
      right: playerRight,
      bottom: playerBottom,
    } = calcPosition(this.player)

    if (playerBottom > this.gameHeight) {
      this.player.y = this.gameHeight - this.player.height
    }

    this.enemies.forEach(enemy => {
      const {
        top: enemyTop,
        left: enemyLeft,
        right: enemyRight,
        bottom: enemyBottom,
      } = calcPosition(enemy)

      if (
        playerLeft < enemyRight &&
        playerRight > enemyLeft &&
        playerTop < enemyBottom &&
        playerBottom > enemyTop
      ) {
        this.gameOver = true
      }
    })
  }

  private handleEnemy = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval) {
      this.enemies.push(
        new Enemy({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
          width: 50,
          height: 50,
          speed: 5,
        })
      )
      // TODO более разнообразно надо
      this.randomEnemyInterval = Math.random() * 1000 + 500
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    this.enemies.forEach(enemy => {
      enemy.draw(ctx)
      enemy.update()
    })

    const oldLength = this.enemies.length
    this.enemies = this.enemies.filter(enemy => enemy.isAlive)
    this.score += oldLength - this.enemies.length
  }
}