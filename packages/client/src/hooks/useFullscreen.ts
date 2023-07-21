import { useState } from 'react'

const useFullscreen = () => {
  /*
    Установлено в any, т.к typescript не поддерживает webkitrequestFullscreen и mozRequestFullscreen
    https://github.com/Microsoft/TypeScript/issues/9908
  */
  const element: any = document.documentElement

  const [isFullscreen, setIsFullscreen] = useState(false)

  const setFullscreen = (): void => {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitrequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullScreen()
    }

    setIsFullscreen(true)
  }

  const cancelFullscreen = (): void => {
    const el: any = document

    if (el.fullscreenElement) {
      el.exitFullscreen()
    } else if (el.webkitExitFullscreen) {
      /* Safari */
      el.webkitExitFullscreen()
    } else if (el.msExitFullscreen) {
      /* IE11 */
      el.msExitFullscreen()
    }

    setIsFullscreen(false)
  }

  const toggleFullscreen = () => {
    if (isFullscreen) {
      cancelFullscreen()
    } else {
      setFullscreen()
    }
  }

  return {
    isFullscreen,
    setIsFullscreen,
    setFullscreen,
    cancelFullscreen,
    toggleFullscreen,
  }
}

export default useFullscreen
