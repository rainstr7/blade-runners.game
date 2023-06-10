import { ReactElement, useMemo } from 'react'
import cn from './style.module.scss'
import Header from '../UI/Header'
import Alert from '../Alert'
import Loader from '../Loader'
import { useLocation } from 'react-router-dom'
import { getLayout } from './settings'
import { routerList } from '../RouterList/settings'

interface Props {
  children: ReactElement
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation()

  const { type, header } = useMemo(() => {
    return routerList[pathname as keyof typeof pathname]
  }, [pathname])

  if (type === 'Landing') {
    return <div className={cn.Layout}>{children}</div>
  }
  const background = cn[type]

  return (
    <div className={`${cn.Layout} ${background}`}>
      <div className={`${cn.Container}`}>
        <div className={cn.Wrapper}>
          <Header>{header}</Header>
          {children}
          <p className={cn.Authors}>BY blade runners</p>
        </div>
      </div>
      <Alert />
      <Loader />
    </div>
  )
}

export default Layout
