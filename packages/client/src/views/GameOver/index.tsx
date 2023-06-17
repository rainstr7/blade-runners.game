import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'

const GameOver = () => {
  const navigate = useNavigate()

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
