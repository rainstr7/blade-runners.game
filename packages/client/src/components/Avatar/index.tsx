import cn from './style.module.scss'

interface AvatarProps {
  image: string
  name: string
}

const Avatar = ({ image, name }: AvatarProps) => {
  return (
    <div className={cn.User}>
      <div className={cn.Avatar} style={{ backgroundImage: `url(${image})` }} />
      {name ? <div className={cn.Name}>{name}</div> : null}
    </div>
  )
}

export default Avatar
