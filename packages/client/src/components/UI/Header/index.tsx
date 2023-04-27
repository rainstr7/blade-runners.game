import cn from './style.module.scss'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  return <h1 className={cn.Header}>{title}</h1>
}

export default Header
