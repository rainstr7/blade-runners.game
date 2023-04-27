import cn from './style.module.scss'

interface Props {
  label: string;
  href?: string;
}

const ButtonLink = ({ label, href = '#' }: Props) => {
  return (
    <a className={cn.ButtonLink} href={href}>
      {label}
    </a>
  )
}

export default ButtonLink
