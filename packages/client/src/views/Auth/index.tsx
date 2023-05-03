import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import ButtonLink from '../../components/UI/ButtonLink'
import Layout from '../../components/Layout'

interface AuthDataInterface {
  login: string
  password: string
}

const initialState = { login: '', password: '' }

const authFormData = [
  {
    placeholder: 'LOGIN',
    name: 'login',
    autoComplete: 'login',
  },
  {
    placeholder: 'PASSWORD',
    name: 'password',
    autoComplete: 'password',
  },
]

const Auth = () => {
  const [authData, setAuthData] = useState<AuthDataInterface>(initialState)

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget) {
      setAuthData({
        ...authData,
        [event.currentTarget.name]: event.currentTarget.value,
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.log('body', JSON.stringify(authData))
  }

  return (
    <Layout>
      <main className={cn.Block}>
        <form className={cn.AuthForm} onSubmit={handleSubmit}>
          {authFormData.map(({ placeholder, name, autoComplete }) => (
            <Input
              placeholder={placeholder}
              value={authData[name as keyof typeof authData]}
              onChange={handleChange}
              name={name}
              autoComplete={autoComplete}
              key={name}
            />
          ))}
          <Button type="submit">SIGN IN</Button>
          <p className={cn.Message}>
            Don’t you have an account?
            <ButtonLink>SIGN UP</ButtonLink>
          </p>
        </form>
      </main>
    </Layout>
  )
}

export default Auth
