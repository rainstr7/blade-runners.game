import Button from '../Button'
import cn from './style.module.scss'
import YaLogoIcon from '../../Icons/YaLogoIcon'
interface Props {
  onClick: () => void
}

const OAuthButton = ({ onClick }: Props) => {
  return (
    <Button className={cn.Button} type="button" onClick={onClick}>
      <YaLogoIcon />
      SIGN IN WITH YANDEX
    </Button>
  )
}

export default OAuthButton
