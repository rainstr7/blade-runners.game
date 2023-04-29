import React, { FC, useEffect, useRef } from 'react'
import styles from './style.module.css'
import useEvent from '../../hooks/useEvent'

const Engine: FC = () => {
  const HEIGHT = 768;
  const WIDTH = 1024;

  const player = {
    x: 50,
    y: 0,
    xV: 0,
    yV: 0,
    jump : true,
    height: 100,
    width: 100,
  }

  const gravity = 0.6;
  const friction = 0.7;

  const handleKeyDownPress = (e: Event) => {
    if ((e as KeyboardEvent).code === 'Space') {
      console.log('Space down')
      if(!player.jump) {
        player.yV = -20;
      }
    }
  }

  useEvent('keydown', handleKeyDownPress)

  const handleKeyUpPress = (e: Event) => {
    if ((e as KeyboardEvent).code === 'Space') {
      console.log('Space Up ')

      if(player.yV < -2) {
        player.yV  = -3;
      }
    }
  }

  useEvent('keyup', handleKeyUpPress)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const renderPlayer = (ctx: any) => {
    ctx.fillStyle = '#f0f'
    ctx.fillRect(player.x,player.y, player.width, player.height);
  }

  const draw = (ctx: any, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if(!player.jump) {
      player.xV *= friction;
    } else {
       player.yV += gravity;
    }
    player.jump = true;

    player.y += player.yV;
    player.x += player.xV;

    renderPlayer(ctx)

    if (HEIGHT < player.y + player.height) {
      player.jump = false
      player.y = HEIGHT - player.height
    }
  }

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas!.getContext('2d')
    let frameCount = 0
    let animationFrameId = 0

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}/>
    </div>
  )
}

export default Engine;
