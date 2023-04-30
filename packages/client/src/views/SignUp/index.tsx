import Layout from '../../components/HOC/Layout'
import cn from './style.module.scss'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import ButtonLink from '../../components/UI/ButtonLink'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

const regFormData = [
  {
    placeholder: 'FIRST NAME',
    name: 'firstName',
    autoComplete: 'firstName',
  },
  {
    placeholder: 'SECOND NAME',
    name: 'secondName',
    autoComplete: 'secondName',
  },
  {
    placeholder: 'E-MAIL',
    name: 'email',
    autoComplete: 'email',
  },
  {
    placeholder: 'PHONE',
    name: 'phone',
    autoComplete: 'phone',
  },
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

const SignUp = () => {
  const [regData, setRegData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    login: '',
    phone: '',
    password: '',
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget) {
      setRegData({
        ...regData,
        [event.currentTarget.name]: event.currentTarget.value,
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.log('body', JSON.stringify(regData))
  }

  return (
    <Layout>
      <main className={cn.Block}>
        <form className={cn.RegForm} onSubmit={handleSubmit}>
          <div className={cn.InputsGroup}>
            {regFormData.map(({ placeholder, name, autoComplete }) => (
              <Input
                placeholder={placeholder}
                value={regData[name as keyof typeof regData]}
                onChange={handleChange}
                name={name}
                autoComplete={autoComplete}
                key={name}
              />
            ))}
          </div>
          <div className={cn.ButtonBlock}>
            <Button label="SIGN UP" type="submit" />
            <p className={cn.Message}>
              Already have an account?
              <ButtonLink label="SIGN IN" />
            </p>
          </div>
        </form>
      </main>
    </Layout>
  )
}

export default SignUp
