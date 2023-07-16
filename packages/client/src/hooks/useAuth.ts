import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  userData,
  signin,
  logoutURL,
  changeUserProfile,
  createUserProfile,
  changeUserPassword,
  changeUserAvatar,
  oAuthSignin,
  getServiceId,
  SERVER_API,
} from '../api'
import useHttp from './useHttp'
import { FieldValues } from 'react-hook-form'
import {
  changeProfile,
  cleanProfile,
  createProfile,
} from '../store/actions/changeProfile'
import { REDIRECT_URI } from '../config/oAuth.config'
import useAlert from './useAlert'
import { useNavigate } from 'react-router-dom'
import useTheme from './useTheme'

const useAuth = () => {
  const { request, error } = useHttp()
  const { handleShowAlert } = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { updateClientTheme } = useTheme()

  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
    }
  }, [error])

  const getUserData = useCallback(async () => {
    const { status, data } = await request(userData)
    if (status === 200) {
      dispatch(changeProfile(data))
      const dataFromDB = await request(`${SERVER_API}/auth-user`, 'POST', data)
      if (dataFromDB.status === 200) {
        updateClientTheme(dataFromDB.data.theme)
      }
    }
  }, [])

  const getAuthenticate = useCallback(async (data: FieldValues) => {
    const { status } = await request(signin, 'POST', data)
    switch (status) {
      case 200:
      case 400:
        await getUserData()
        handleShowAlert('success')
        navigate('/start')
        return true
      default:
        return false
    }
  }, [])

  const handleLogout = useCallback(async () => {
    const { status } = await request(logoutURL, 'POST')
    if (status === 200) {
      navigate('/')
      dispatch(cleanProfile())
      handleShowAlert('success', 'logout has been successfully done')
      return true
    }
    return false
  }, [])

  const handleUpdateData = useCallback(async (body: FieldValues) => {
    const { status, data } = await request(changeUserProfile, 'PUT', body)
    if (status === 200) {
      dispatch(changeProfile(data))
      return true
    }
    return false
  }, [])

  const handleChangePassword = useCallback(async (body: FieldValues) => {
    const { status } = await request(changeUserPassword, 'PUT', body)
    if (status === 200) {
      handleShowAlert('success', 'password has been successfully changed')
    }
    return status === 200
  }, [])

  const handleChangeAvatar = useCallback(async (body: FieldValues) => {
    const response = await request(changeUserAvatar, 'PUT', body)
    if (response.status === 200) {
      dispatch(changeProfile(response.data))
      handleShowAlert('success', 'avatar has been successfully changed')
      return true
    }
    return false
  }, [])

  const handleRegistration = useCallback(async (body: FieldValues) => {
    const { status, data } = await request(createUserProfile, 'POST', body)
    if (status === 200) {
      dispatch(createProfile(data))
      return true
    }
    return false
  }, [])

  const getOAuthServiceId = useCallback(async () => {
    const { data, status } = await request(
      `${getServiceId}?redirect_uri=${REDIRECT_URI}`
    )
    if (status === 200) {
      handleShowAlert('success', 'service id has been successfully received')
      return data.service_id
    }
    handleShowAlert('error', 'service id error')
    return null
  }, [])

  const handleOAuthRegistration = useCallback(async (body: FieldValues) => {
    const { status } = await request(oAuthSignin, 'POST', body)
    switch (status) {
      case 200:
      case 400:
        await getUserData()
        handleShowAlert('success', 'OAuth has been successfully received')
        navigate('/start')
        return true
      default:
        handleShowAlert('error', 'OAuth error')
        return false
    }
  }, [])

  return {
    getAuthenticate,
    handleRegistration,
    handleLogout,
    handleUpdateData,
    handleChangePassword,
    handleChangeAvatar,
    getOAuthServiceId,
    getUserData,
    handleOAuthRegistration,
    error,
  }
}

export default useAuth
