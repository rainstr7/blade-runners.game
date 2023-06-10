import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { hideAlert, showAlert } from '../store/actions/alert'
import { AlertType } from '../store/reduces/interfaces'

const defaultText = {
  success: 'success done',
  error: 'something wrong',
  warning: 'something warning',
  info: 'some info',
}
const useAlert = () => {
  const dispatch = useDispatch()

  const handleShowAlert = useCallback(
    (type: AlertType, text = defaultText[type]) => {
      dispatch(showAlert({ show: true, type, text }))
      setTimeout(handleHideAlert, 3000)
    },
    []
  )

  const handleHideAlert = useCallback(() => {
    dispatch(hideAlert())
  }, [])
  return { handleShowAlert, handleHideAlert }
}

export default useAlert
