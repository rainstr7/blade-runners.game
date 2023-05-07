import cn from './style.module.scss'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import ButtonLink from '../../components/UI/ButtonLink'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const regFormData = [
  {
    placeholder: 'FIRST NAME',
    name: 'firstName',
    autoComplete: 'firstName',
    required: true,
  },
  {
    placeholder: 'SECOND NAME',
    name: 'secondName',
    autoComplete: 'secondName',
    required: true,
  },
  {
    placeholder: 'E-MAIL',
    name: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    placeholder: 'PHONE',
    name: 'phone',
    autoComplete: 'phone',
    required: true,
  },
  {
    placeholder: 'LOGIN',
    name: 'login',
    autoComplete: 'login',
    required: true,
  },
  {
    placeholder: 'PASSWORD',
    name: 'password',
    autoComplete: 'password',
    required: true,
  },
]
const phoneRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/

const schema = yup
  .object({
    firstName: yup.string().required(),
    secondName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
    login: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log('body', JSON.stringify(data))
  }

  return (
    <main className={cn.Block}>
      <form className={cn.RegForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.InputsGroup}>
          {regFormData.map(({ placeholder, name, autoComplete, required }) => (
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
        </div>
        <div className={cn.ButtonBlock}>
          <Button type="submit">SIGN UP</Button>
          <p className={cn.Message}>
            Already have an account?
            <ButtonLink to="/signin">SIGN IN</ButtonLink>
          </p>
        </div>
      </form>
    </main>
  )
}

export default SignUp
