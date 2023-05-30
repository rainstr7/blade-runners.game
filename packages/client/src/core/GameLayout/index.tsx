import React, { useEffect, useRef } from 'react'
import cn from './style.module.css'
import useEvent from '../../hooks/useEvent'
import { Engine } from '../engine'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeScore } from '../../store/actions/changeScore'
import { KeyConfiguration } from '../types'

const GAME_WIDTH = 1024
const GAME_HEIGHT = 768

// FIXME этому тут не место
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

const handleKeyDown = (e: Event, keyConfig: KeyConfiguration) => {
  const { code } = e as KeyboardEvent
  if (code === 'Space') {
    keyConfig.Space = 'down'
  } else if (code === 'Enter') {
    keyConfig.Enter = 'down'
    toggleFullScreen()
  }
}

const handleKeyUp = (e: Event, keyConfig: KeyConfiguration) => {
  const { code } = e as KeyboardEvent
  if (code === 'Space') {
    keyConfig.Space = 'up'
  } else if (code === 'Enter') {
    keyConfig.Enter = 'up'
  }
}

const GameLayout = () => {
  const engine = new Engine(GAME_WIDTH, GAME_HEIGHT)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEvent('keydown', e => handleKeyDown(e, keyConfig))
  useEvent('keyup', e => handleKeyUp(e, keyConfig))

  const keyConfig: KeyConfiguration = { Space: 'up', Enter: 'up' }

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

      engine.game(context, deltaTime, keyConfig)
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
