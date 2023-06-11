import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import ButtonLink from '../../components/UI/ButtonLink'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { authFormData, schema } from './settings'
import useAuth from '../../hooks/useAuth'
import OAuthButton from '../../components/UI/OAuthButton'
import { REDIRECT_URI } from '../../config/oAuth.config'

const Auth = () => {
  const { getAuthenticate, getOAuthServiceId } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    await getAuthenticate(data)
  }

  const OAuth = async () => {
    const service_id = await getOAuthServiceId()
    if (service_id) {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
    }
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
        <OAuthButton onClick={OAuth} />
        <p className={cn.Message}>
          Don’t you have an account?
          <ButtonLink to="/signup">SIGN UP</ButtonLink>
        </p>
      </form>
    </main>
  )
}

export default Auth
