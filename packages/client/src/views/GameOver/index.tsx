import { useEffect } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import { changeLayout } from '../../store/actions/changeLayout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IRootStore, LayoutView } from '../../store/reduces/interfaces'
import Card from '../../components/Card'
import { useNavigate } from 'react-router-dom'
interface GameOverProps {
  changeLayout: (type: LayoutView) => void,
  score: number
}
const GameOver = ({ changeLayout, score }: GameOverProps) => {
  const navigate = useNavigate()

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
        <Card info={[{label: 'score', value: score}]} />
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

function mapStateToProps(state: IRootStore) {
  return {
    score: state.score.value
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    changeLayout: (type: LayoutView) => dispatch(changeLayout(type)),
  }
}

type DispatchProps = typeof mapDispatchToProps
type StateProps = typeof mapStateToProps
export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(GameOver)
