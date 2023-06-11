import cn from './style.module.scss'

interface Props {
  size?: 'small' | 'large'
  onChange?: () => void
}

const DefaultAvatar = ({ size = 'small' }: Props) => {
  return (
    <div
      className={`${cn.Avatar}, ${cn[size]}`}
      style={{ backgroundImage: `url(../../../src/assets/avatar.jpeg)` }}
    />
  )
}
export default DefaultAvatar
