import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Header from '../../components/UI/Header'
import ButtonLink from '../../components/UI/ButtonLink'

const Auth = () => {
  const [values, setValue] = useState({ login: '', password: '' })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget) {
      setValue({
        ...values,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log('body', JSON.stringify(values))
  }

  return (
    <div className={cn.Container}>
      <div className={cn.Block}>
        <Header title='BLADE RUNNER' />
        <form className={cn.AuthForm} onSubmit={handleSubmit}>
          <Input
            placeholder='LOGIN'
            type='text'
            value={values.login}
            onChange={handleChange}
            name='login'
          />
          <Input
            placeholder='PASSWORD'
            type='password'
            value={values.password}
            onChange={handleChange}
            name='password'
          />
          <Button label='SIGN IN' type='submit' />
          <p className={cn.Message}>Don’t you have an account?
            <ButtonLink label='SIGN UP' />
          </p>
        </form>
        <span className={cn.Authors}>BY blade runners</span>
      </div>
    </div>
  )
}

export default Auth
