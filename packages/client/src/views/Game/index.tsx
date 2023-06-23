import React, { FC } from 'react'
import GameLayout from '../../core/GameLayout'
import cn from './style.module.scss'

const Game: FC = () => {
  return (
    <main className={cn.Container}>
      <GameLayout />
    </main>
  )
}

export default Game
