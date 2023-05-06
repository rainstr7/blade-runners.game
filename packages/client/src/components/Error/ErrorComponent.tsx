import React from 'react'
import Button from '../UI/Button'
import cn from './ErrorComponent.module.scss'

interface ErrorProps {
  errorCode: number
}

const ErrorComponent: React.FC<ErrorProps> = ({ errorCode }) => {
  const errorMessage = errorCode.toString().startsWith('4')
    ? `OOOPS... THIS PAGE DOESN'T EXIST`
    : `OOOPS... SOMETHING WENT WRONG`

  return (
    <div className={cn.Container}>
      <h1>{errorCode}</h1>
      <div className={cn.Message}>{errorMessage}</div>
      <Button size="small">TO MAIN</Button>
    </div>
  )
}

export default ErrorComponent
