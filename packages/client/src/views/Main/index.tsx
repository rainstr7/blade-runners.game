import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import ButtonLink from '../../components/UI/ButtonLink'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { IRootStore } from '../../store/reduces/interfaces'
import Avatar from '../../components/Avatar'
import getAvatarFullUrl from '../../utils/getFullAvatarUrl'
import useAuth from '../../hooks/useAuth'
import { REDIRECT_URI } from '../../config/oAuth.config'

const Main = () => {
  const { id } = useSelector((state: IRootStore) => state.user)
  const { avatar } = useSelector((state: IRootStore) => state.user)
  const navigate = useNavigate()
  const { search } = useLocation()
  const { handleOAuthRegistration } = useAuth()

  useEffect(() => {
    const query = new URLSearchParams(search)
    const code = query.get('code')
    if (code) {
      ;(async () => {
        await handleOAuthRegistration({
          code: code,
          redirect_uri: REDIRECT_URI,
        })
      })()
      navigate('/')
    }
  }, [search])

  const goToGameHandler = () => {
    navigate(id ? '/start' : '/signin')
  }

  return (
    <main className={cn.Container}>
      <header className={cn.Header}>
        <p>By Blade Runners</p>
        {id ? (
          <Avatar image={getAvatarFullUrl(avatar)} />
        ) : (
          <ButtonLink to="/signin">sign in</ButtonLink>
        )}
      </header>
      <div className={cn.Main}>
        <div>
          <h2 className={cn.Title}>Blade Runner</h2>
          <p className={cn.Text}>
            He is a simple guy who wanted to be with his sweetheart, but she was
            stolen. And the only thing he can do is run!
          </p>
        </div>

        <div className={cn.Controls}>
          <div>
            <div className={cn.Text}>Reviews:</div>
            <div className={cn.Reviews}>
              <div>"This is the best game in the world"</div>
              <div>...Jane Doe from Blizzard</div>
            </div>

            <div className={cn.Reviews}>
              <div>"This is the best thing that happened to me"</div>
              <div>...John Doe from EA</div>
            </div>
          </div>

          <div className={cn.Button}>
            <Button type="button" onClick={goToGameHandler}>
              let's play
            </Button>
          </div>
        </div>
      </div>

      <footer className={cn.Footer}>
        <p>BY blade runners</p>
        <p>2023 All rights reserved</p>
      </footer>
    </main>
  )
}

export default Main
