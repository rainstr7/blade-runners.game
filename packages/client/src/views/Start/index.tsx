import Button from '../../components/UI/Button'
import { useNavigate } from 'react-router-dom'
import cn from './style.module.scss'
import { useCallback } from 'react'

const Start = () => {
  const navigate = useNavigate()

  const handleClick = useCallback((path: string) => () => navigate(path), [])

  return (
    <main className={cn.Block}>
      <div className={cn.MainButtonGroup}>
        <Button onClick={handleClick('/game')}>Start Game</Button>
        <Button onClick={handleClick('/settings')}>Settings</Button>
      </div>
      <div className={cn.AdditionalButtonGroup}>
        <Button size="small" onClick={handleClick('/rating')}>
          Leaderboard
        </Button>
        <Button size="small" onClick={handleClick('/forum')}>
          Forum
        </Button>
      </div>
    </main>
  )
}

export default Start
