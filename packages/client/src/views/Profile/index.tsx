import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import CardLink from '../../components/UI/CardLink'
import { validationProfileSchema } from '../../services/validation/validationProfile'
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

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(validationProfileSchema),
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
          <CardLink to='/start'>Back</CardLink>
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
