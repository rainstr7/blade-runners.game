import cn from './style.module.scss'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import CardLink from '../../components/UI/CardLink'
import schema from '../../services/validation/validationProfile'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { ButtonName, FormField } from './settings'
import useAuth from '../../hooks/useAuth'
import Avatar from '../../components/UI/Avatar'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import getAvatarFullUrl from '../../utils/getFullAvatarUrl'
import useAlert from '../../hooks/useAlert'

const Profile = () => {
  const [view, setView] = useState<'changeProfile' | 'changePassword'>(
    'changeProfile'
  )

  const [location, setLocation] = useState<GeolocationPosition | undefined>(undefined)

  const resolver = useMemo(() => {
    return yupResolver<FieldValues>(schema[view])
  }, [view])

  const { handleShowAlert } = useAlert()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver,
  })
  const {
    handleLogout,
    handleUpdateData,
    handleChangePassword,
    handleChangeAvatar,
    error,
  } = useAuth()
  const user = useSelector((state: IRootStore) => state.user)

  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
    }
  }, [error])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position)
    });
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    const {
      login,
      display_name,
      email,
      first_name,
      phone,
      second_name,
      newPassword,
      oldPassword,
    } = data
    switch (view) {
      case 'changeProfile':
        if (
          await handleUpdateData({
            login: login || user.login,
            display_name: display_name || user.display_name,
            email: email || user.email,
            first_name: first_name || user.first_name,
            phone: phone || user.phone,
            second_name: second_name || user.second_name,
          })
        ) {
          reset()
          handleShowAlert('success', 'profile has been successfully changed')
        }
        return
      case 'changePassword':
        if (
          await handleChangePassword({
            oldPassword: oldPassword,
            newPassword: newPassword,
          })
        ) {
          reset()
          handleShowAlert('success', 'password has been successfully changed')
        }
        return
      default:
        handleShowAlert('error')
    }
  }
  const handleChangeView = useCallback(
    () =>
      setView(prev =>
        prev === 'changeProfile' ? 'changePassword' : 'changeProfile'
      ),
    []
  )

  const form = useMemo(() => {
    return (
      <form className={cn.form} onSubmit={handleSubmit(onSubmit)}>
        {FormField[view].map(
          ({ placeholder, name, autoComplete, required }) => (
            <Input
              placeholder={String(
                user[name as keyof typeof user] || placeholder
              )}
              name={name}
              autoComplete={autoComplete}
              key={name}
              register={register}
              options={{ required }}
              error={errors[name]}
            />
          )
        )}
        <div className={cn.formSubmit}>
          <Button type="button" onClick={handleChangeView}>
            {ButtonName[view]}
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    )
  }, [view, onSubmit, register, errors])

  const onChangeAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      const { files } = event.target
      if (files) {
        const formData = new FormData()
        formData.append('avatar', files[0])
        await handleChangeAvatar(formData)
      }
    },
    []
  )

  return (
    <main className={cn.profile}>
      {location ?
        <div className={cn.location}>
          <p>Your location:</p>
          <p>{location?.coords?.latitude}</p>
          <p>{location?.coords?.longitude}</p>
        </div> : ''
      }
      <div className={cn.title}>
        <CardLink to="/start">Back</CardLink>
        <Avatar
          src={getAvatarFullUrl(user.avatar)}
          size="large"
          onChangeAvatar={onChangeAvatar}
        />
        <Button size="small" onClick={handleLogout}>
          Exit
        </Button>
      </div>
      <div className={cn.formWrapper}>{form}</div>
    </main>
  )
}

export default Profile
