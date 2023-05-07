import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import CardLink from '../../components/UI/CardLink'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

const ProfileFormData = [
  {
    placeholder: 'FIRST NAME',
    name: 'firstName',
    autoComplete: 'firstName',
    required: true
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
    required: true
  },
  {
    placeholder: 'PHONE',
    name: 'phone',
    autoComplete: 'phone',
    required: true
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

interface ProfileDataInterface {
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

const phoneRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/

const schema = yup
  .object({
    firstName: yup.string().required(),
    secondName: yup.string(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
    login: yup.string(),
    password: yup.string()
  })
  .required()

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  })

  const handleExit = () => {
    console.log('exit')
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log('body', JSON.stringify(data))
  }

  return (
    <main className={cn.profile}>
        <div className={cn.title}>
          <CardLink>Back</CardLink>
          <Button size='small' onClick={handleExit}>Exit</Button>
        </div>
        <div className={cn.formWrapper}>
          <form className={cn.form} onSubmit={handleSubmit(onSubmit)}>
            {ProfileFormData.map(({ placeholder, name, autoComplete, required }) => (
              <Input
                placeholder={placeholder}
                name={name}
                autoComplete={autoComplete}
                key={name}
                register={register}
                options={{ required }}
                error={errors[name]}
              />
            ))}
            <div className={cn.formSubmit}><Button type='submit'>Save</Button></div>
            {errors.login && <span>This field is required</span>}
          </form>
        </div>
      </main>
  )
}

export default Profile
