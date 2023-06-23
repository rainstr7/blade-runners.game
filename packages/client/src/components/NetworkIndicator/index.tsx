import cn from './styles.module.scss'
import { useNetworkStatus } from '../../hooks/useNetworkStatus'

const NetworkIndicator = () => {
  const isOnline = useNetworkStatus()

  return (
    <div className={`${cn.indicator} ${isOnline ? cn.online : cn.offline}`} />
  )
}

export default NetworkIndicator
