import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import useScore from '../../hooks/useScore'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'

const GameOver = () => {
  let isSavingResult = false

  const { avatar, display_name } = useSelector(
    (state: IRootStore) => state.user
  )
  const score = useSelector(
    (state: IRootStore) => state.score.value
  )

  const newRating = {
    player: {
      display_name,
      avatar
    },
    rating: score
  }

  const { handleSetScore } = useScore()
  const navigate = useNavigate()

  const saveScore = () => {
    handleSetScore(newRating)
    isSavingResult = true
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
          {!isSavingResult && <Button onClick={saveScore}>Save Result</Button>}
          <Button  onClick={restartButton}>Restart</Button>
          <Button size="small" onClick={startButton}>
            To main
          </Button>
        </div>
      </div>
    </main>
  )
}

export default GameOver
