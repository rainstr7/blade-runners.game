import cn from './style.module.scss'
import Avatar from '../UI/Avatar'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'
import getAvatarFullUrl from '../../utils/getFullAvatarUrl'

const Card = () => {
  const { avatar, display_name } = useSelector(
    (state: IRootStore) => state.user
  )
  const score = useSelector((state: IRootStore) => {
    return state.score.value
  })

  return (
    <div className={cn.Card}>
      <Avatar name={display_name} src={getAvatarFullUrl(avatar)} />
      <p>{`score: ${score}`}</p>
    </div>
  )
}

export default Card
