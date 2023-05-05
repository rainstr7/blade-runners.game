import cn from './style.module.scss'

export const UserName = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className={cn.User}>
      <div className={cn.Avatar} style={{ backgroundImage: `url(${image})` }} />
      <div className={cn.Name}>{name}</div>
    </div>
  )
}
