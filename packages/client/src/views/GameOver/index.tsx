import { useEffect } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import { changeLayout } from '../../store/actions/changeLayout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { useSelector } from "react-redux";
import { IRootStore, LayoutView } from '../../store/reduces/interfaces'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
interface GameOverProps {
  changeLayout: (type: LayoutView) => void
}
const GameOver = ({ changeLayout }: GameOverProps) => {
  const navigate = useNavigate()

  const score = useSelector((state: IRootStore) => {
    return state.score
  })

  const template = [
    {
      label: 'score',
      value: score.value,
    }
  ]

  useEffect(() => {
    changeLayout('GameOver')
    return () => {
      changeLayout('Default')
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

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    changeLayout: (type: LayoutView) => dispatch(changeLayout(type)),
  }
}

type DispatchProps = typeof mapDispatchToProps
export default connect<null, DispatchProps>(null, mapDispatchToProps)(GameOver)
