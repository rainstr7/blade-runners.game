import { useEffect } from 'react'
import { changeLayout } from '../../store/actions/changeLayout'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { LayoutView } from '../../store/reduces/interfaces'
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
  let errorMessage
  if (errorCode === '500') {
    errorMessage = `OOOPS... SOMETHING WENT WRONG`
    useEffect(() => {
      changeLayout('500')
      return () => {
        changeLayout('Default')
      }
    }, [])
  } else {
    errorMessage = `OOOPS... THIS PAGE DOESN'T EXIST`
    useEffect(() => {
      changeLayout('404')
      return () => {
        changeLayout('Default')
      }
    }, [])
  }
  // const errorMessage =
  //   errorCode === '404'
  //     ? `OOOPS... THIS PAGE DOESN'T EXIST`
  //     : `OOOPS... SOMETHING WENT WRONG`

  // useEffect(() => {
  //   changeLayout('404')
  //   return () => {
  //     changeLayout('Default')
  //   }
  // }, [])

  return (
    <div className={cn.Container}>
      <h1 className={cn.Message}>{errorMessage}</h1>
      <Button size="small">TO MAIN</Button>
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

// export default ErrorComponent
