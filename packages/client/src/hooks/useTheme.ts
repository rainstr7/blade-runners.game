import { useCallback, useEffect } from 'react'
import { setTheme } from '../store/actions/theme'
import { useDispatch, useSelector } from 'react-redux'
import { IRootStore } from '../store/reduces/interfaces'
import useHttp from './useHttp'
import useAlert from './useAlert'
import bgLight from '../assets/light_bg.jpg'
import bgDark from '../assets/default_bg.jpg'
import { SERVER_API } from '../api'

const THEMES = {
  light: {
    type: 'light',
    defaultColor: '#e5dfffeb',
    layoutBackground: bgLight,
  },
  dark: {
    type: 'dark',
    defaultColor: '#fff',
    layoutBackground: bgDark,
  },
}

const useTheme = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state: IRootStore) => state.theme)
  const { id } = useSelector((state: IRootStore) => state.user)
  const { request, error } = useHttp()
  const { handleShowAlert } = useAlert()

  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
    }
  }, [error])

  const updateClientTheme = useCallback(
    (newTheme: 'light' | 'dark') => {
      if (theme !== newTheme) {
        dispatch(setTheme({ theme: newTheme }))
      }
    },
    [theme]
  )

  const handleToggleTheme = useCallback(
    async (theme: 'light' | 'dark') => {
      if (id) {
        const { status } = await request(`${SERVER_API}/update-theme`, 'PUT', {
          id,
          theme,
        })
        if (status === 200) {
          handleShowAlert('success', 'theme has been successfully saved')
        }
      }
      updateClientTheme(theme)
    },
    [theme, id]
  )

  return {
    theme: THEMES[theme],
    handleToggleTheme,
    updateClientTheme,
  }
}

export default useTheme
