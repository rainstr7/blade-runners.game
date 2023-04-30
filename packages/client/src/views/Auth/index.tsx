import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import ButtonLink from '../../components/UI/ButtonLink'
import Layout from '../../components/HOC/Layout'

const Auth = () => {
  const [authData, setAuthData] = useState({ login: '', password: '' })

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget) {
      setAuthData({
        ...authData,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.log('body', JSON.stringify(authData))
  }

  return (
    <Layout>
      <div className={cn.Block}>
        <form className={cn.AuthForm} onSubmit={handleSubmit}>
          <Input
            placeholder='LOGIN'
            type='text'
            value={authData.login}
            onChange={handleChange}
            name='login'
            autoComplete='login'
          />
          <Input
            placeholder='PASSWORD'
            type='password'
            value={authData.password}
            onChange={handleChange}
            name='password'
            autoComplete='password'
          />
          <Button label='SIGN IN' type='submit' />
          <p className={cn.Message}>
            Don’t you have an account?
            <ButtonLink label='SIGN UP' />
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Auth
