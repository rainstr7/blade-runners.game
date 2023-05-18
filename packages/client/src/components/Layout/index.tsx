import { ReactElement, useMemo } from 'react'
import cn from './style.module.scss'
import Header from '../UI/Header'
import { useSelector } from 'react-redux'
import { IRootStore, LayoutView } from '../../store/reduces/interfaces'

interface Props {
  children: ReactElement
}

const Layout = ({ children }: Props) => {
  const type = useSelector<IRootStore>(state => state.layout.type)

  const header = useMemo(() => {
    switch (type) {
      case 'Default':
        return 'BLADE RUNNER'
      case 'GameOver':
        return 'GAME OVER'
      default:
        return type as LayoutView
    }
  }, [type])

  if (type === 'Landing') {
    return <div className={cn.Layout}>{children}</div>
  }

  const background = cn[type as LayoutView] || cn.Error

  return (
    <div className={`${cn.Layout} ${background}`}>
      <div className={`${cn.Container}`}>
        <div className={cn.Wrapper}>
          <Header>{header}</Header>
          {children}
          <p className={cn.Authors}>BY blade runners</p>
        </div>
      </div>
    </div>
  )
}

export default Layout
