import React, { FC, useEffect, useRef } from 'react'
import styles from './style.module.css'
import useEvent from '../../hooks/useEvent'
import Background from '../background'
import Enemy from '../enemy'
import Player from '../player'
import GameText from '../gameText'
import bg from '../../assets/game_bg.png'

// TODO Full screen
const gameHeight = 768;
const gameWidth = 1024;

let score = 0;
let gameOver = false;

const background = new Background(gameWidth, gameHeight, bg, 3);
const player = new Player(gameWidth, gameHeight, 100, 100, 0.5);

let enemies: Enemy[] = [];
let enemyTimer = 0;
const enemyInterval = 2000;
let randomEnemyInterval = Math.random() * 1000 + 500;

const pressedKeyCodes: string[] = []

const handleKeyDown = (e: Event) => {
  const keyCode = (e as KeyboardEvent)?.code;
  if (keyCode && keyCode === 'Space' && !pressedKeyCodes.includes(keyCode)) {
    pressedKeyCodes.push(keyCode);
  }
}

const handleKeyUp = (e: Event) => {
  const keyCode = (e as KeyboardEvent)?.code;
  if (keyCode && keyCode === 'Space') {
    pressedKeyCodes.splice(pressedKeyCodes.indexOf(keyCode), 1);
    // if(player.yV < -3  ) {
    //   player.yV  = -2   ;
    // }
  }
}

const displayScore = (ctx: CanvasRenderingContext2D) => {
  GameText.displayText(ctx, 50, 50, `Score: ${score}`, 'Helvetica', 40);
}
const displayGameOver = (ctx: CanvasRenderingContext2D) => {
  GameText.displayText(ctx, gameWidth/2 - 100, gameHeight/2 - 20, `Game Over`, 'Helvetica', 40);
}

// TODO сервис? синглтон?
const checkCollisions = () => {
  const playerRightXPos = player.x + player.width
  const playerBottomYPos = player.y + player.height;
  const playerLeftXPos = player.x;
  const playerTopYPos = player.y

  if (playerBottomYPos > gameHeight) {
    player.y = gameHeight - player.height
  }

  enemies.forEach(enemy => {
    const enemyRightXPos = enemy.x + enemy.width;
    const enemyBottomYPos = enemy.y + enemy.height;
    const enemyLeftXPos = enemy.x;
    const enemyTopYPos = enemy.y

    if (playerLeftXPos < enemyRightXPos &&
      playerRightXPos > enemyLeftXPos &&
      playerTopYPos < enemyBottomYPos &&
      playerBottomYPos > enemyTopYPos
    ) {
      gameOver = true;
    }
  })
}

const handleEnemy = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
  if (enemyTimer > enemyInterval + randomEnemyInterval) {
    enemies.push(new Enemy(gameWidth, gameHeight,50, 50, 5));
    // TODO более разнообразно надо
    randomEnemyInterval = Math.random() * 1000 + 500;
    enemyTimer = 0;
  } else {
    enemyTimer += deltaTime;
  }

  enemies.forEach(enemy => {
    enemy.draw(ctx);
    enemy.update();
  })

  const oldLength = enemies.length;
  enemies = enemies.filter(enemy => !enemy.markForDelete);

  score += oldLength - enemies.length;
}

const game = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  background.draw(ctx);
  background.update();

  handleEnemy(ctx, deltaTime)

  checkCollisions();

  player.draw(ctx);
  player.update(pressedKeyCodes);

  displayScore(ctx);

  if (gameOver) {
    displayGameOver(ctx);
  }
}

const Engine: FC = () => {
  useEvent('keydown', handleKeyDown)
  useEvent('keyup', handleKeyUp)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas!.getContext('2d');
    let animationFrameId = 0

    const render = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime.current;
      lastTime.current = timeStamp;

      game(context!, deltaTime);
      if (gameOver) {
        return;
      }
      animationFrameId = requestAnimationFrame(render)
    }
    render(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [game])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={gameWidth} height={gameHeight}/>
    </div>
  )
}

export default Engine;
