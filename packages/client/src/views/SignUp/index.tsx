import cn from './style.module.scss'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import ButtonLink from '../../components/UI/ButtonLink'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { regFormData, schema } from './settings'
import useAuth from '../../hooks/useAuth'
import { useCallback } from 'react'

const SignUp = () => {
  const { handleRegistration } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<FieldValues> = useCallback(async data => {
    await handleRegistration(data)
  }, [])

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
