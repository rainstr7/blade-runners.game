import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { LayoutView } from '../../store/reduces/interfaces'
import { changeLayout } from '../../store/actions/changeLayout'
import Button from '../../components/UI/Button'
import cn from './style.module.scss'

interface ErrorProps {
  errorCode: '404' | '500'
  changeLayout: (type: LayoutView) => void
}

const ErrorComponent: React.FC<ErrorProps> = ({
  errorCode = '404',
  changeLayout,
}) => {
  const navigate = useNavigate()
  const errorMessage =
    errorCode === '500'
      ? `OOOPS... SOMETHING WENT WRONG`
      : `OOOPS... THIS PAGE DOESN'T EXIST`

  useEffect(() => {
    changeLayout('Error')
    return () => {
      changeLayout('Default')
    }
  }, [])

  function GoToMainHandler() {
    navigate('/start')
  }

  return (
    <div className={cn.Container}>
      <h1>{errorCode}</h1>
      <h2 className={cn.Message}>{errorMessage}</h2>
      <Button type="button" size="small" onClick={GoToMainHandler}>
        TO MAIN
      </Button>
    </div>
  )
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    changeLayout: (type: LayoutView) => dispatch(changeLayout(type)),
  }
}

type DispatchProps = typeof mapDispatchToProps

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(ErrorComponent)
