import cn from './style.module.scss'
import useFullscreen from '../../hooks/useFullscreen'

import iconFullscreen from '../../assets/icon/fullscreen.png'

const FullScreen = () => {
  const { toggleFullscreen } = useFullscreen()

  return (
    <button className={`${cn.button}`} onClick={toggleFullscreen}>
      <img src={iconFullscreen} alt="fullscreen" />
    </button>
  )
}

export default FullScreen
