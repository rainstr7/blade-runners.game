import { ReactElement } from 'react'
import cn from './style.module.scss'
import Header from '../UI/Header'
import { connect } from 'react-redux'
import { IRootStore, LayoutView } from '../../store/reduces/interfaces'

interface Props {
  children: ReactElement
  type: LayoutView
}

const Layout = ({ children, type = 'Default' }: Props) => {
  if (type === 'Landing') {
    return <div className={cn.Layout}>{children}</div>
  }
  const background = Number(type) ? cn.Error : cn[type]
  const header = type === 'Default' ? 'BLADE RUNNER' : type

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

function mapStateToProps(state: IRootStore) {
  return {
    type: state.layout.type,
  }
}

export default connect(mapStateToProps)(Layout)
