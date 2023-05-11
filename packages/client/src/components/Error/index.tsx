import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { LayoutView } from '../../store/reduces/interfaces'
import { changeLayout } from '../../store/actions/changeLayout'
import Button from '../UI/Button'
import cn from './style.module.scss'

interface ErrorProps {
  errorCode: '404' | '500'
  changeLayout: (type: LayoutView) => void
}

const ErrorComponent: React.FC<ErrorProps> = ({
  errorCode = '404',
  changeLayout,
}) => {
  const errorMessage =
    errorCode === '500'
      ? `OOOPS... SOMETHING WENT WRONG`
      : `OOOPS... THIS PAGE DOESN'T EXIST`

  const useChangeLayout = (errorCode: '404' | '500') => {
    useEffect(() => {
      changeLayout(errorCode)
      return () => {
        changeLayout('Default')
      }
    }, [])
  }

  useChangeLayout(errorCode)

  return (
    <div className={cn.Container}>
      <h2 className={cn.Message}>{errorMessage}</h2>
      <Link to="/start">
        <Button size="small">TO MAIN</Button>
      </Link>
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
