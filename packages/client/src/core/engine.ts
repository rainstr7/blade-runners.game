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
  private keyCodes: string[] = []

  private readonly _isGameStartWords = ['3...', '2...', '1...', 'Go']
  private readonly _isGameStartDelayWord = 1000
  private readonly enemyInterval = 2000
  private readonly gameHeight: number
  private readonly gameWidth: number

  // погрешность при коллизиях, по хорошему надо поправить спрайтмап и
  // задать подходяшие размеры. Либо просто переписать collisionDetection
  private readonly collisionOffset = 20

  private readonly background: Background
  private readonly player: Player

  private enemiesParams: EnemySpriteParams[] = []
  private enemySpeed = 5

  constructor(gameWidth: number, gameHeight: number) {
    this.gameHeight = gameHeight
    this.gameWidth = gameWidth

    this.background = new Background({
      gameWidth: this.gameWidth,
      gameHeight: this.gameHeight,
      source: bg,
      speed: 1,
    })
    this.player = new Player({
      gameWidth: this.gameWidth,
      gameHeight: this.gameHeight,
      height: 100,
      width: 100,
      imageSrc: heroImage,
      weight: 0.5,
    })

    this.init()
  }

  private init() {
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

  game = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.background.draw(ctx)
    this.background.update()

    this.checkCollisions()

    this.player.draw(ctx)
    this.player.update(this.keyCodes, deltaTime)

    this.displayScore(ctx)

    this.displayStartGame(ctx)

    if (!this._isGameStart) {
      return
    }

    this.handleEnemy(ctx, deltaTime)

    this.checkSpeed(ctx)

    if (this.gameOver) {
      this.displayGameOver(ctx)
    }
  }

  handleKeyDown = (e: Event) => {
    const keyCode = (e as KeyboardEvent)?.code
    if (keyCode && keyCode === 'Space' && !this.keyCodes.includes(keyCode)) {
      this.keyCodes.push(keyCode)
    }
  }

  handleKeyUp = (e: Event) => {
    const keyCode = (e as KeyboardEvent)?.code
    if (keyCode && keyCode === 'Space') {
      this.keyCodes.splice(this.keyCodes.indexOf(keyCode), 1)
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

  private showMessage = (ctx: CanvasRenderingContext2D, message: string) => {
    GameText.displayText({
      ctx,
      x: this.gameWidth / 2 - 100,
      y: this.gameHeight / 2 - 20,
      text: message,
      font: 'Helvetica',
      fontSize: 40,
    })
  }

  // FIXME както потупому
  private checkSpeed(ctx: CanvasRenderingContext2D): void {
    switch (this.score) {
      case 5:
        this.showMessage(ctx, 'Hurry up!')
        this.background.speed = 2
        this.enemySpeed = 6
        this.enemyInterval = 1600
        break
      case 10:
        this.enemySpeed = 7
        this.enemyInterval = 1300
        this.player.animationSpeed = 17
        break
      case 15:
        this.showMessage(ctx, 'Faster!')
        this.background.speed = 3
        this.enemySpeed = 8
        this.enemyInterval = 1000
        break
      case 20:
        this.enemySpeed = 9
        this.enemyInterval = 700
        this.player.animationSpeed = 20
        break
      case 30:
        this.showMessage(ctx, 'Run!!!')
        this.background.speed = 4
        this.enemySpeed = 10
        this.enemyInterval = 400
        break
      case 40:
        this.enemySpeed = 12
        this.enemyInterval = 200
        break
      default:
        break
    }
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
        playerLeft + this.collisionOffset < enemyRight &&
        playerRight - this.collisionOffset > enemyLeft &&
        playerTop + this.collisionOffset < enemyBottom &&
        playerBottom - this.collisionOffset > enemyTop
      ) {
        this.gameOver = true
      }
    })
  }

  private handleEnemy = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    if (this.enemyTimer > this.enemyInterval + randomFromInterval(100, 1000)) {
      const random = randomFromInterval(0, this.enemiesParams.length - 1)
      const enemyParams = this.enemiesParams[random]

      this.enemies.push(
        new Enemy({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
          width: enemyParams.width,
          height: enemyParams.height,
          speed: this.enemySpeed,
          imageSrc: enemyParams.imageSrc,
          y: enemyParams.y ? enemyParams.y() : undefined,
        })
      )

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
