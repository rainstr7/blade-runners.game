import cn from './style.module.scss'
import Avatar from '../Avatar'

interface CardProps {
  info: { label: string; value: number }[]
}

const Card = ({ info }: CardProps) => {
  return (
    <div className={cn.Card}>
      <Avatar name="KEKS OUALNIY" image="/avatar.jpeg" />
      <div className={''}>
        <ul>
          {info.map(({ label, value }) => (
            <li key={label}>{`${label}: ${value}`}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card
