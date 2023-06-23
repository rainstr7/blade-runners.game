import DeleteIcon from '../../Icons/DeleteIcon'
import cn from './style.module.scss'

interface Props {
  onClick: () => void
}
const DeleteButton = ({ onClick }: Props) => {
  return (
    <div className={cn.Button} onClick={onClick}>
      <DeleteIcon />
    </div>
  )
}

export default DeleteButton
