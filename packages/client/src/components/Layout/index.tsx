import React, { ReactElement, useMemo } from 'react'
import cn from './style.module.scss'
import Header from '../UI/Header'
import Alert from '../UI/Alert'
import Loader from '../Loader'
import { useLocation } from 'react-router-dom'
import { routerList } from '../RouterList/settings'
import NetworkIndicator from '../NetworkIndicator'
import useTheme from '../../hooks/useTheme'
import FullScreen from '../FullScreen'
interface Props {
  children: ReactElement
}

const Layout = ({ children }: Props) => {
  const { pathname } = useLocation()
  const { handleToggleTheme, theme } = useTheme()

  const { type, header } = useMemo(() => {
    if (Object.hasOwn(routerList, pathname)) {
      return routerList[pathname as keyof typeof routerList]
    }
    return { type: undefined, header: undefined }
  }, [pathname])

  const render = useMemo(() => {
    if (type === 'Landing') {
      return <div className={cn.Layout}>{children}</div>
    }
    return (
      <div
        className={`${cn.Layout} ${cn[type ?? 'Default']}`}
        style={{ backgroundImage: `url(${theme?.layoutBackground})` }}>
        <FullScreen />
        <NetworkIndicator />
        <div className={`${cn.Container}`}>
          <div className={cn.Wrapper}>
            <Header>{header}</Header>
            {children}
            <p className={cn.Authors}>by blade runners</p>
          </div>
        </div>
        <Alert />
        <Loader />
      </div>
    )
  }, [type, cn, theme])

  return (
    <div
      className={cn.ThemeWrapper}
      style={{ '--default-color': theme?.defaultColor } as React.CSSProperties}>
      <button
        className={`${cn.button} ${cn[theme?.type]}`}
        onClick={() =>
          handleToggleTheme(theme.type === 'light' ? 'dark' : 'light')
        }
      />
      {render}
    </div>
  )
}

export default Layout
