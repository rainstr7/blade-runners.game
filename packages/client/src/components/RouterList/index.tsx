import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { IRootStore } from '../../store/reduces/interfaces'
import { routerList, routerListAfterAuth } from './settings'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import isEqual from '../../utils/isEqual'

const RoutersList = () => {
  const { id } = useSelector((state: IRootStore) => state.user)
  const [routes, setRoutes] = useState(routerList)
  const { getUserData } = useAuth()

  useEffect(() => {
    if (!id) {
      ;(async () => {
        await getUserData()
      })()
    }
  }, [])

  useEffect(() => {
    if (id) {
      setRoutes(prevRoutes => {
        if (isEqual(prevRoutes, routerList)) {
          return { ...prevRoutes, ...routerListAfterAuth }
        }
        return prevRoutes
      })
    } else {
      setRoutes(routerList)
    }
  }, [id])

  return (
    <Routes>
      {Object.entries(routes).map(([path, { component }]) => (
        <Route path={path} element={component} key={path} />
      ))}
    </Routes>
  )
}

export default RoutersList
