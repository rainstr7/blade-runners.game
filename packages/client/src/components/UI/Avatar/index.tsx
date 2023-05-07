import cn from './style.module.scss'

interface Props {
  src: string
  size?: 'small' | 'medium'
}

const Avatar = ({ size = 'small', ...props }: Props) => {
  const avatarSize = cn[size]
  return (
    <div
      className={`${cn.avatar} ${avatarSize}`}
      style={{ backgroundImage: `url(${props.src})` }}
    />
  )
}

export default Avatar
