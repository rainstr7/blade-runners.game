import { useEffect } from 'react'

const useEvent = (event: string, handler: (e: Event) => void) => {
  useEffect(() => {
    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    }
  })
}

export default useEvent
