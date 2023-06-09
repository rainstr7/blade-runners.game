import Background from '../Background/background'
import Player from '../Player/player'
import { Enemy, FlyingEnemy, GroundEnemy } from '../Enemy/enemy'
import GameText from '../GameText/gameText'

import bgLayer1 from '../../assets/bg/layer1.png'
import bgLayer2 from '../../assets/bg/layer2.png'
import bgLayer3 from '../../assets/bg/layer3.png'
import bgLayer4 from '../../assets/bg/layer4.png'
import bgLayer5 from '../../assets/bg/layer5.png'
import enemy1Image from '../../assets/enemy1.png'
import enemy2Image from '../../assets/enemy2.png'
import enemy3Image from '../../assets/enemy3.png'
import heroImage from '../../assets/hero_run.png'

import { calcPosition, randomFromInterval } from '../utils'
import { EnemyType, KeyConfiguration } from '../types'

import { FloatingMessage } from '../floatingMessage'

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

  private floatingMessages: FloatingMessage[] = []

  private readonly _isGameStartWords = ['3...', '2...', '1...', 'Go']
  private readonly _isGameStartDelayWord = 1000
  private enemyInterval = 2000
  private readonly gameHeight: number
  private readonly gameWidth: number

  // погрешность при коллизиях, по хорошему надо поправить спрайтмап и
  // задать подходяшие размеры. Либо просто переписать collisionDetection
  private readonly collisionOffset = 20

  private readonly background: Background
  private readonly player: Player

  private gameSpeed = 1

  constructor(gameWidth: number, gameHeight: number) {
    this.gameHeight = gameHeight
    this.gameWidth = gameWidth

    this.background = new Background({
      gameSpeed: this.gameSpeed,
      gameWidth: gameWidth,
      gameHeight: gameHeight,
      sources: [bgLayer1, bgLayer2, bgLayer3, bgLayer4, bgLayer5],
    })

    this.player = new Player({
      gameWidth: this.gameWidth,
      gameHeight: this.gameHeight,
      height: 100,
      width: 100,
      imageSrc: heroImage,
      weight: 0.5,
    })
  }

  game = (
    ctx: CanvasRenderingContext2D,
    deltaTime: number,
    keyConfig: KeyConfiguration
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.background.draw(ctx)
    this.background.update()

    this.checkCollisions()

    this.player.draw(ctx)
    this.player.update(keyConfig, deltaTime)

    this.displayScore(ctx)

    this.displayStartGame(ctx)

    if (!this._isGameStart) {
      return
    }

    this.handleEnemy(ctx, deltaTime)

    this.handleScore()

    this.floatingMessages.forEach(message => {
      message.update()
      message.draw(ctx)
    })

    this.floatingMessages = this.floatingMessages.filter(
      message => message.isAlive
    )

    this.checkSpeed(ctx)
  }

  private displayScore = (ctx: CanvasRenderingContext2D) => {
    GameText.displayText({
      ctx,
      x: 70,
      y: 100,
      text: `Score: ${this.score}`,
      fontSize: 50,
    })
  }

  private displayStartGame = (ctx: CanvasRenderingContext2D) => {
    if (this._isGameStartIteration >= this._isGameStartWords.length) {
      this._isGameStart = true
      return
    }

    if (!this._isGameStartTimeStamp) {
      this._isGameStartTimeStamp = Date.now()
    }

    ctx.rect(0, 0, this.gameWidth, this.gameHeight)
    ctx.fillStyle = '#00000070'
    ctx.fill()

    GameText.displayText({
      ctx,
      x: this.gameWidth / 2 - 50,
      y: this.gameHeight / 2,
      text: `${this._isGameStartWords[this._isGameStartIteration]}`,
      fontSize: 100,
      fillStyle: '#00fffe',
      shadowColor: '#000',
    })

    if (Date.now() - this._isGameStartTimeStamp > this._isGameStartDelayWord) {
      this._isGameStartIteration++
      this._isGameStartTimeStamp = Date.now()
    }
  }

  private showMessage = (ctx: CanvasRenderingContext2D, message: string) => {
    GameText.displayText({
      ctx,
      x: this.gameWidth / 2 - 150,
      y: this.gameHeight / 2,
      text: message,
      fontSize: 60,
    })
  }

  // FIXME както потупому
  private checkSpeed(ctx: CanvasRenderingContext2D): void {
    switch (this.score) {
      case 5:
        this.gameSpeed = 2
        this.showMessage(ctx, 'Hurry up!')
        this.enemyInterval = 1600
        break
      case 10:
        this.enemyInterval = 1300
        break
      case 15:
        this.gameSpeed = 3
        this.showMessage(ctx, 'Faster!')
        this.enemyInterval = 1000
        break
      case 20:
        this.gameSpeed = 4
        this.enemyInterval = 700
        break
      case 30:
        this.gameSpeed = 5
        this.showMessage(ctx, 'Run!!!')
        this.enemyInterval = 400
        break
      case 40:
        this.gameSpeed = 6
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

  private handleScore = () => {
    this.enemies.forEach(enemy => {
      if (enemy.isActive && this.player.x > enemy.x + enemy.width) {
        enemy.isActive = false
        this.score++

        this.floatingMessages.push(
          new FloatingMessage('+1', this.player.x + 40, this.player.y, 270, 100)
        )
      }
    })
  }

  private handleEnemy = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    if (this.enemyTimer > this.enemyInterval + randomFromInterval(100, 1000)) {
      const enemyType: EnemyType = randomFromInterval(0, 2) as EnemyType

      const enemyByType: Record<EnemyType, Enemy> = {
        0: new GroundEnemy({
          x: this.gameWidth,
          y: this.gameHeight - 50,
          width: 50,
          height: 50,
          gameSpeed: this.gameSpeed,
          speedModifier: 3,
          imageSrc: enemy1Image,
        }),
        1: new GroundEnemy({
          x: this.gameWidth,
          y: this.gameHeight - 100,
          width: 150,
          height: 100,
          gameSpeed: this.gameSpeed,
          speedModifier: 4,
          imageSrc: enemy3Image,
        }),
        2: new FlyingEnemy({
          x: this.gameWidth,
          y: randomFromInterval(this.gameHeight - 100, this.gameHeight - 250),
          width: 50,
          height: 50,
          gameSpeed: this.gameSpeed,
          speedModifier: 3,
          imageSrc: enemy2Image,
        }),
      }

      this.enemies.push(enemyByType[enemyType])

      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }

    this.enemies.forEach(enemy => {
      enemy.draw(ctx)
      enemy.update(deltaTime)
    })

    this.enemies = this.enemies.filter(enemy => enemy.isAlive)
  }
}
