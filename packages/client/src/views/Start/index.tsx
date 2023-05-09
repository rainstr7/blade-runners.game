import Button from '../../components/UI/Button'
import { useNavigate } from 'react-router-dom'
import cn from './style.module.scss'
import Loader from '../../components/UI/Loader'

const Start = () => {
  const navigate = useNavigate()

  const leaderBoardButton = () => {
    navigate('/rating')
  }
  const forumButton = () => {
    navigate('/forum')
  }
  const settingsButton = () => {
    navigate('/settings')
  }

  const startButton = () => {
    navigate('/game')
  }

  return (
    <main className={cn.Block}>
      <Loader />
      <div className={cn.MainButtonGroup}>
        <Button onClick={startButton}>Start Game</Button>
        <Button onClick={settingsButton}>Settings</Button>
      </div>
      <div className={cn.AdditionalButtonGroup}>
        <Button size="small" onClick={leaderBoardButton}>
          Leaderboard
        </Button>
        <Button size="small" onClick={forumButton}>
          Forum
        </Button>
      </div>
    </main>
  )
}

export default Start
