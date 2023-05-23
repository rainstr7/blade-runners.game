import { useEffect } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import { changeLayout } from '../../store/actions/changeLayout'
import { useDispatch } from 'react-redux'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
import { template } from './settings'

const GameOver = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeLayout('GameOver'))
    return () => {
      dispatch(changeLayout('Default'))
    }
  }, [])

  const restartButton = () => {
    navigate('/game')
  }
  const startButton = () => {
    navigate('/start')
  }
  return (
    <main className={cn.Block}>
      <div className={''}>
        <Card info={template} />
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
