import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import CardLink from '../../components/UI/CardLink'

const ProfileFormData = [
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

interface ProfleDataInterface {
  first_name: string,
  second_name: string,
  email: string,
  phone: string,
  login: string,
  password: string
}

const initialState = {
  first_name: '',
  second_name: '',
  email: '',
  phone: '',
  login: '',
  password: ''
}

const Profile = () => {
  const [profileData, setprofileData] = useState<ProfleDataInterface>(initialState)

  const handleExit = () => {
    console.log('exit')
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.currentTarget) {
      setprofileData({
        ...profileData,
        [event.currentTarget.name]: event.currentTarget.value,
      })
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    console.log('body', JSON.stringify(profileData))
  }

  return (
    <main className={cn.profile}>
        <div className={cn.title}>
          <CardLink>Back</CardLink>
          <Button size='small' onClick={handleExit}>Exit</Button>
        </div>
        <div className={cn.formWrapper}>
          <form className={cn.form} onSubmit={handleSubmit}>
            {ProfileFormData.map(({ placeholder, name, autoComplete }) => (
              <Input
                placeholder={placeholder}
                value={profileData[name as keyof typeof profileData]}
                onChange={handleChange}
                name={name}
                autoComplete={autoComplete}
                key={name}
              />
            ))}
            <div className={cn.formSubmit}><Button type='submit'>Save</Button></div>
          </form>
        </div>
      </main>
  )
}

export default Profile
