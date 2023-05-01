import React, { FC, useEffect, useRef } from 'react'
import styles from './style.module.css'
import useEvent from '../../hooks/useEvent'
import Background from '../background'
import Enemy from '../enemy'
import Player from '../player'

// TODO Full screen
const HEIGHT = 768;
const WIDTH = 1024;

let score = 0;
let gameOver = false;

const jumpBoost = -20;

const background = new Background();
const player = new Player();

let enemies: Enemy[] = [];
let enemyTimer = 0;
const enemyInterval = 2000;
let randomEnemyInterval = Math.random() * 1000 + 500;

const pressedKeyCodes: string[] = []

const handleKeyDownPress = (e: KeyboardEvent) => {
  if (e.code === 'Space' && !pressedKeyCodes.includes(e.code)) {
    pressedKeyCodes.push(e.code);
    console.log('Space down ', pressedKeyCodes)

    if(!player.jump) {
      player.yV = jumpBoost;
    }
  }
}

const handleKeyUpPress = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    pressedKeyCodes.splice(pressedKeyCodes.indexOf(e.code), 1);
    console.log(pressedKeyCodes)
     if(player.yV < -3  ) {
      player.yV  = -2   ;
    }
  }
}

// TODO to class
const displayScore = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000';
  ctx.font = '40px Helvetica';
  ctx.fillText(`Score: ${score}`, 50, 50)
}

const displayGameOver = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#000';
  ctx.font = '40px Helvetica';
  ctx.fillText(`Game Over`, WIDTH/2, HEIGHT/2)
}

// TODO make a service, maybe use singleton pattern
const checkCollisions = () => {
  if (player.y + player.height > HEIGHT) {
    player.jump = false;
    player.y = HEIGHT - player.height
  }

  enemies.forEach(enemy => {
    if (player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      console.log('collisison')
      gameOver = true;
    }

  })
}

const  handleEnemy = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
  if (enemyTimer > enemyInterval + randomEnemyInterval) {
    enemies.push(new Enemy(WIDTH, HEIGHT));
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

  player.draw(ctx);
  player.update([])

  checkCollisions();

  displayScore(ctx);
  if (gameOver) {
    displayGameOver(ctx)
  }
}



const Engine: FC = () => {
  // Key press events listeners
  useEvent('keydown',    handleKeyDownPress)
  useEvent('keyup', handleKeyUpPress)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  let lastTime = 0;

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas!.getContext('2d')
    let animationFrameId = 0

    const render = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

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
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}/>
    </div>
  )
}

export default Engine;
