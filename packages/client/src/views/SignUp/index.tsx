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
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    login: '',
    phone: '',
    password: '',
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget) {
      setRegistrationData({
        ...registrationData,
        [event.currentTarget.name]: event.currentTarget.value,
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.log('body', JSON.stringify(registrationData))
  }

  return (
    <main className={cn.Block}>
      <form className={cn.RegForm} onSubmit={handleSubmit}>
        <div className={cn.InputsGroup}>
          {regFormData.map(({ placeholder, name, autoComplete }) => (
            <Input
              placeholder={placeholder}
              value={registrationData[name as keyof typeof registrationData]}
              onChange={handleChange}
              name={name}
              autoComplete={autoComplete}
              key={name}
            />
          ))}
        </div>
        <div className={cn.ButtonBlock}>
          <Button type="submit">SIGN UP</Button>
          <p className={cn.Message}>
            Already have an account?
            <ButtonLink>SIGN IN</ButtonLink>
          </p>
        </div>
      </form>
    </main>
  )
}

export default SignUp
