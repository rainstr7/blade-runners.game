import Button from '../../components/UI/Button'
import cn from './style.module.scss'
import { errors, ErrorType } from './errors'

interface Props {
  errorCode: ErrorType
  onClick: () => void
}

const Error = ({ errorCode, onClick }: Props) => (
  <main className={cn.Container}>
    <h2 className={cn.Message}>{errors[errorCode]}</h2>
    <Button type="button" size="small" onClick={onClick}>
      TO MAIN
    </Button>
  </main>
)

export default Error
