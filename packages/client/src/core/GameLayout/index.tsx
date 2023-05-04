import React, { FC, useEffect, useRef } from 'react'
import styles from './style.module.css'
import useEvent from '../../hooks/useEvent'
import { Engine } from '../engine'

// TODO Необходимо сделать адаптивно
const engine = new Engine(1024, 768)

const GameLayout: FC = () => {
  useEvent('keydown', engine.handleKeyDown)
  useEvent('keyup', engine.handleKeyUp)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!context) {
      throw new Error('Error getting context')
    }

    let animationFrameId = 0

    const render = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime.current
      lastTime.current = timeStamp

      engine.game(context, deltaTime)
      if (engine.gameOver) {
        return
      }
      animationFrameId = requestAnimationFrame(render)
    }
    render(0)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [engine.game])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} width={1024} height={768} />
    </div>
  )
}

export default GameLayout
