import { ReactElement } from 'react'
import cn from './style.module.scss'
import Header from '../../UI/Header'

interface Props {
  children: ReactElement;
  type?: 'Default' | 'GameOver'
}

const Layout = ({ type = 'Default', children }: Props) => {
  const background = cn[type];
  return (
    <div className={cn.Layout}>
      <div className={`${cn.Container} ${background}`}>
        <Header title='BLADE RUNNER' />
        {children}
        <span className={cn.Authors}>BY blade runners</span>
      </div>
    </div>
  )

}

export default Layout
