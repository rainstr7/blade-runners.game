import cn from './style.module.scss'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'

const VIEW_BOX = '0 0 1000 1000'
const CX = '500'
const CY = '500'

const R1 = '30'
const R2 = '20'
const R3 = '40'
const R4 = '10'

const Loader = () => {
  const { loading } = useSelector((state: IRootStore) => state.loading)
  if (loading) {
    return (
      <div className={cn.Loader}>
        <svg className={cn.CircleFW} viewBox={VIEW_BOX}>
          <circle className={cn.Path} cx={CX} cy={CY} fill="none" r={R1} />
        </svg>
        <svg
          className={cn.CircleSW}
          style={{ animationDuration: '1.4s' }}
          viewBox={VIEW_BOX}>
          <circle className={cn.Path2} cx={CX} cy={CY} fill="none" r={R1} />
        </svg>
        <svg className={cn.CircleFW} viewBox={VIEW_BOX}>
          <circle className={cn.Path3} cx={CX} cy={CY} fill="none" r={R1} />
        </svg>
        <svg className={cn.CircleFW} viewBox={VIEW_BOX}>
          <circle className={cn.Path4} cx={CX} cy={CY} fill="none" r={R2} />
        </svg>
        <svg className={cn.CircleFW} viewBox={VIEW_BOX}>
          <circle className={cn.Path5} cx={CX} cy={CY} fill="none" r={R3} />
        </svg>
        <svg className={cn.CircleFW} viewBox={VIEW_BOX}>
          <circle className={cn.Path6} cx={CX} cy={CY} fill="none" r={R3} />
        </svg>
        <svg className={cn.CircleSW} viewBox={VIEW_BOX}>
          <circle className={cn.Path7} cx={CX} cy={CY} fill="none" r={R3} />
        </svg>
        <svg
          className={cn.CircleSW}
          style={{ animationTimingFunction: 'ease-in-out' }}
          viewBox={VIEW_BOX}>
          <circle className={cn.Path8} cx={CX} cy={CY} fill="none" r={R3} />
        </svg>
        <svg className={cn.CircleFW} viewBox={VIEW_BOX}>
          <circle className={cn.Path9} cx={CX} cy={CY} fill="none" r={R4} />
        </svg>
      </div>
    )
  }
  return null
}

export default Loader
