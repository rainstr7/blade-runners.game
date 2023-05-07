import React, { useEffect } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import ButtonLink from '../../components/UI/ButtonLink'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'
import { LayoutView } from '../../store/reduces/interfaces'
import { changeLayout } from '../../store/actions/changeLayout'
import { connect } from 'react-redux'

interface MainProps {
  changeLayout: (type: LayoutView) => void
}

const Main = ({ changeLayout }: MainProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    changeLayout('Landing')
    return () => {
      changeLayout('Default')
    }
  }, [])

  const goToGameHandler = () => navigate('/start')

  return (
    <main className={cn.Container}>

      <header className={cn.Header}>
        <p>
          By Blade Runners
        </p>
        <ButtonLink to={'/start'}>Go To Game</ButtonLink>
      </header>

      <div className={cn.Main}>

        <div>
          <h2 className={cn.Title}>Blade Runner</h2>
          <p className={cn.Text}>He is a simple guy who wanted to be with his sweetheart, but she was stolen.
            And the only thing he can do is run!</p>
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
            <Button type='button' onClick={goToGameHandler}>Go to game</Button>
          </div>

        </div>

      </div>

      <footer className={cn.Footer}>
        <p>
          BY blade runners
        </p>
        <p>
          2023 All rights reserved
        </p>
      </footer>
    </main>
  )
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    changeLayout: (type: LayoutView) => dispatch(changeLayout(type)),
  }
}

type DispatchProps = typeof mapDispatchToProps

export default connect<null, DispatchProps>(null, mapDispatchToProps)(Main)
