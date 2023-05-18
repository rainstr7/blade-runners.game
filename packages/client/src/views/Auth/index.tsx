import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import ButtonLink from '../../components/UI/ButtonLink'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { authFormData, schema } from './settings'

const Auth = () => {
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
      <form className={cn.AuthForm} onSubmit={handleSubmit(onSubmit)}>
        {authFormData.map(({ placeholder, name, autoComplete, required }) => (
          <Input
            placeholder={placeholder}
            key={name}
            name={name}
            autoComplete={autoComplete}
            register={register}
            options={{ required }}
            error={errors[name]}
          />
        ))}
        <Button type="submit">SIGN IN</Button>
        <p className={cn.Message}>
          Don’t you have an account?
          <ButtonLink to="/signup">SIGN UP</ButtonLink>
        </p>
        {errors.login && <span>This field is required</span>}
      </form>
    </main>
  )
}

export default Auth
