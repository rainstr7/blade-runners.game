import React, { useEffect, useRef } from 'react'
import cn from './style.module.css'
import useEvent from '../../hooks/useEvent'
import { Engine } from '../engine'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeScore } from '../../store/actions/changeScore'

const GAME_WIDTH = 1024
const GAME_HEIGHT = 768

const GameLayout = () => {
  const engine = new Engine(GAME_WIDTH, GAME_HEIGHT)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEvent('keydown', engine.handleKeyDown)
  useEvent('keyup', engine.handleKeyUp)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      throw new Error('Canvas error')
    }

    canvas.width = GAME_WIDTH
    canvas.height = GAME_HEIGHT
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Error getting context')
    }

    const gameOver = (): void => {
      dispatch(changeScore(engine.getScore))

      navigate('/gameover')
    }

    let animationFrameId = 0

    const render = (timeStamp: number) => {
      const deltaTime = timeStamp - lastTime.current
      lastTime.current = timeStamp

      engine.game(context, deltaTime)
      if (engine.gameOver) {
        gameOver()
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
    <div className={cn.Container}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default GameLayout
