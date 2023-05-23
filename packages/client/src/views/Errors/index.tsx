import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ErrorType } from './errors'
import { changeLayout } from '../../store/actions/changeLayout'
import Error from './Error'

interface Props {
  errorCode: ErrorType
}

const Errors = ({ errorCode }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(changeLayout(errorCode))
    return () => {
      dispatch(changeLayout('Default'))
    }
  }, [])

  const goToMainHandler = () => navigate('/start')

  return <Error onClick={goToMainHandler} errorCode={errorCode} />
}

export default Errors
