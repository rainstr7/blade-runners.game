import Background from './background'

import bg from '../assets/game_bg.png'
import enemy1Image from '../assets/enemy1.png'
import enemy2Image from '../assets/enemy2.png'
import enemy3Image from '../assets/enemy3.png'
import heroImage from '../assets/hero_run.png'

import Player from './player'
import Enemy from './enemy'
import GameText from './gameText'
import { calcPosition, randomFromInterval } from './utils'
import { EnemySpriteParams } from './types'

export class Engine {
  get gameOver(): boolean {
    return this._gameOver
  }

  set gameOver(value: boolean) {
    this._gameOver = value
  }

  get getScore(): number {
    return this.score
  }

  private _gameOver = false
  private _isGameStart = false
  private _isGameStartIteration = 0
  private _isGameStartTimeStamp = 0
  private score = 0
  private enemies: Enemy[] = []
  private enemyTimer = 0
  private randomEnemyInterval = Math.random() * 1000 + 500
  private pressedKeyCodes: string[] = []

  private readonly _isGameStartWords = ['3...', '2...', '1...', 'Go']
  private readonly _isGameStartDelayWord = 1000
  private readonly enemyInterval = 2000
  private readonly gameHeight: number
  private readonly gameWidth: number
  private readonly background: Background
  private readonly player: Player

  private readonly enemiesParams: EnemySpriteParams[] = []

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
      imageSrc: heroImage,
      weight: 0.5,
    })

    this.enemiesParams = [
      { imageSrc: enemy1Image, width: 50, height: 50 },
      {
        imageSrc: enemy2Image,
        width: 50,
        height: 50,
        y: () =>
          randomFromInterval(this.gameHeight - 100, this.gameHeight - 250),
      },
      { imageSrc: enemy3Image, width: 150, height: 100 },
    ]
  }

  game = async (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.background.draw(ctx)
    this.background.update()

    this.checkCollisions()

    this.player.draw(ctx)
    this.player.update(this.pressedKeyCodes, deltaTime)

    this.displayScore(ctx)

    this.displayStartGame(ctx)

    if (!this._isGameStart) {
      return
    }

    this.handleEnemy(ctx, deltaTime)

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

  private displayStartGame = async (ctx: CanvasRenderingContext2D) => {
    if (this._isGameStartIteration >= this._isGameStartWords.length) {
      this._isGameStart = true
      return
    }

    if (!this._isGameStartTimeStamp) {
      this._isGameStartTimeStamp = Date.now()
    }

    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = "#00000070";
    ctx.fill();

    GameText.displayText({
      ctx,
      x: this.gameWidth / 2 - 100,
      y: this.gameHeight / 2 - 20,
      text: `${this._isGameStartWords[this._isGameStartIteration]}`,
      font: 'Helvetica',
      fontSize: 100,
      fillStyle: '#00fffe'
    })

    if (Date.now() - this._isGameStartTimeStamp > this._isGameStartDelayWord) {
      this._isGameStartIteration++
      this._isGameStartTimeStamp = Date.now()
    }

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
  // FIXME collisionDetection работает криво, сейчас проверяет пересечение квадратов
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
      const random = randomFromInterval(0, this.enemiesParams.length - 1)
      const enemyParams = this.enemiesParams[random]

      this.enemies.push(
        new Enemy({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
          width: enemyParams.width,
          height: enemyParams.height,
          speed: 5,
          imageSrc: enemyParams.imageSrc,
          y: enemyParams.y ? enemyParams.y() : undefined,
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
      enemy.update(deltaTime)
    })

    const oldLength = this.enemies.length
    this.enemies = this.enemies.filter(enemy => enemy.isAlive)
    this.score += oldLength - this.enemies.length
  }
}
