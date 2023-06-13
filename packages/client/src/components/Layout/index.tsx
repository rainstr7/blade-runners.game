import { ReactElement, useMemo } from 'react'
import cn from './style.module.scss'
import Header from '../UI/Header'
import Alert from '../UI/Alert'
import Loader from '../Loader'
import { useLocation } from 'react-router-dom'
import { routerList } from '../RouterList/settings'

interface Props {
  children: ReactElement
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation()

  const { type, header } = useMemo(() => {
    if (Object.hasOwn(routerList, pathname)) {
      return routerList[pathname as keyof typeof routerList]
    }
    return { type: undefined, header: undefined }
  }, [pathname])

  if (type === 'Landing') {
    return <div className={cn.Layout}>{children}</div>
  }

  return (
    <div className={`${cn.Layout} ${cn[type ?? 'Default']}`}>
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
