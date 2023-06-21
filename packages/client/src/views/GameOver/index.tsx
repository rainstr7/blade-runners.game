import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import useScore from '../../hooks/useScore'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'

interface NewRatingData {
  player: {
    display_name: string | undefined
    avatar: string | undefined
  }
  rating: number
}

const GameOver = () => {
  const { avatar, display_name } = useSelector(
    (state: IRootStore) => state.user
  )
  const score = useSelector((state: IRootStore) => state.score.value)

  const newRating: NewRatingData = {
    player: {
      display_name,
      avatar,
    },
    rating: score,
  }

  const { handleSetScore } = useScore()
  const navigate = useNavigate()

  const saveScore = () => {
    handleSetScore(newRating)
  }

  const restartButton = () => {
    navigate('/game')
  }
  const startButton = () => {
    navigate('/start')
  }
  return (
    <main className={cn.Block}>
      <div>
        <Card />
        <div className={cn.ButtonsGroup}>
          <Button onClick={saveScore}>Save Result</Button>
          <Button onClick={restartButton}>Restart</Button>
          <Button size="small" onClick={startButton}>
            To main
          </Button>
        </div>
      </div>
    </main>
  )
}

export default GameOver
