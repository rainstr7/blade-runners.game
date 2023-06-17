import { useSelector } from 'react-redux'
import { IRootStore } from '../../../store/reduces/interfaces'
import cn from './style.module.scss'

const Alert = () => {
  const { show, type, text } = useSelector((state: IRootStore) => state.alert)

  if (!show) {
    return null
  }

  return <div className={`${cn.Alert} ${cn[type]}`}>{text}</div>
}

export default Alert
