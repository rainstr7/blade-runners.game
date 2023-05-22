import React, { FC, useEffect, useRef } from 'react'
import cn from './style.module.css'
import useEvent from '../../hooks/useEvent'
import { Engine } from '../engine'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeScore } from '../../store/actions/changeScore'

const gameWidth = 1024
const gameHeight = 768
// TODO Необходимо сделать адаптивно
const engine = new Engine(gameWidth, gameHeight)

const GameLayout = () => {
  // TODO Необходимо сделать адаптивно
  const engine = new Engine(1024, 768)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEvent('keydown', engine.handleKeyDown)
  useEvent('keyup', engine.handleKeyUp)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = gameWidth
      canvas.height = gameHeight
    }
    const context = canvas?.getContext('2d')

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
      <canvas ref={canvasRef} className={cn.Canvas} />
    </div>
  )
}

export default GameLayout
