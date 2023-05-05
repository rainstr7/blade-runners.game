import { UserName } from '../UserName'
import cn from './style.module.scss'

interface CardProps {
  info: { label: string; value: number }[]
}

const Card = ({ info }: CardProps) => {
  return (
    <div className={cn.Card}>
      <UserName
        name="KEKS OUALNIY"
        image="https://sun9-62.userapi.com/s/v1/if2/hX2drELI1dlQ9an7NbVcl9inBZ4UXS9V2aUkS9FmB3C7STg2CRMY8THQursyE4tTuxJvx2cNmCI_YW3zrdlLLwh8.jpg?size=320x400&quality=96&type=album"
      />

      <div className={''}>
        <ul>
          {info.map(({ label, value }) => (
            <li>{`${label}: ${value}`}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card
