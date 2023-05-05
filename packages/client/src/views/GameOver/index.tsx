import { useEffect } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import { changeLayout } from '../../store/actions/changeLayout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { LayoutView } from '../../store/reduces/interfaces'
import Card from '../../components/Card'

const template = [
  {
    label: 'scope',
    value: 321312,
  },
  {
    label: 'ranking',
    value: 56,
  },
  {
    label: 'scores',
    value: 321312,
  },
]

const GameOver = ({ changeLayout }: any) => {
  useEffect(() => {
    changeLayout('GameOver')
    return () => {
      changeLayout('Default')
    }
  }, [])

  return (
    <main className={cn.Block}>
      <div className={''}>
        <Card info={template} />
        <div className={cn.ButtonsGroup}>
          <Button>Restart</Button>
          <Button size="small">To main</Button>
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
