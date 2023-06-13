import { useLocation, useNavigate } from 'react-router-dom'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import { routerList } from '../../components/RouterList/settings'
import { errors } from './errors'

const Errors = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const goToMainHandler = () => navigate('/')

  return (
    <main className={cn.Container}>
      <h2 className={cn.Message}>
        {errors[
          routerList[pathname as keyof typeof routerList]
            ?.header as keyof typeof errors
        ] || '404'}
      </h2>
      <Button type="button" size="small" onClick={goToMainHandler}>
        TO MAIN
      </Button>
    </main>
  )
}

export default Errors
