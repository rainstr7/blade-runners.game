import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addScoreResult, leaderboardData } from '../api'
import useHttp from './useHttp'
import { FieldValues } from 'react-hook-form'
import { changeScore, changeLeaderboardData } from '../store/actions/changeScore'

const useAuth = () => {
  const { request, error } = useHttp()
  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      // handleShowAlert('error', error)
    }
  }, [error])

  const getLeaderboardData = useCallback(async () => {
    const { status, data } = await request(leaderboardData)
    if (status === 200) {
      dispatch(changeLeaderboardData(data))
    }
  }, [])

  // const getAuthenticate = useCallback(async (data: FieldValues) => {
  //   const { status } = await request(signin, 'POST', data)
  //   switch (status) {
  //     case 200:
  //     case 400:
  //       await getUserData()
  //       handleShowAlert('success')
  //       navigate('/start')
  //       return true
  //     default:
  //       return false
  //   }
  // }, [])

  const handleSetScore = useCallback(async (score: number) => {
    const newScore = {
      data: {},
      ratingFieldName: "string",
      teamName: "BladeRunner"
    }

    const { status, data } = await request(addScoreResult, 'POST', newScore)
    if (status === 200) {
      dispatch(changeScore(score))
      // dispatch(cleanProfile())
      return true
    }
    return false
  }, [])

  // const handleUpdateData = useCallback(async (body: FieldValues) => {
  //   const { status, data } = await request(changeUserProfile, 'PUT', body)
  //   if (status === 200) {
  //     dispatch(changeProfile(data))
  //     return true
  //   }
  //   return false
  // }, [])

  // const handleChangePassword = useCallback(async (body: FieldValues) => {
  //   const { status } = await request(changeUserPassword, 'PUT', body)
  //   if (status === 200) {
  //     handleShowAlert('success', 'password has been successfully changed')
  //   }
  //   return status === 200
  // }, [])

  // const handleChangeAvatar = useCallback(async (body: FieldValues) => {
  //   const response = await request(changeUserAvatar, 'PUT', body)
  //   if (response.status === 200) {
  //     dispatch(changeProfile(response.data))
  //     handleShowAlert('success', 'avatar has been successfully changed')
  //     return true
  //   }
  //   return false
  // }, [])

  // const handleRegistration = useCallback(async (body: FieldValues) => {
  //   const { status, data } = await request(createUserProfile, 'POST', body)
  //   if (status === 200) {
  //     dispatch(createProfile(data))
  //     return true
  //   }
  //   return false
  // }, [])

  // const getOAuthServiceId = useCallback(async () => {
  //   const { data, status } = await request(
  //     `${getServiceId}?redirect_uri=${REDIRECT_URI}`
  //   )
  //   if (status === 200) {
  //     handleShowAlert('success', 'service id has been successfully received')
  //     return data.service_id
  //   }
  //   handleShowAlert('error', 'service id error')
  //   return null
  // }, [])

  // const handleOAuthRegistration = useCallback(async (body: FieldValues) => {
  //   const { status } = await request(oAuthSignin, 'POST', body)
  //   switch (status) {
  //     case 200:
  //     case 400:
  //       await getUserData()
  //       handleShowAlert('success', 'OAuth has been successfully received')
  //       navigate('/start')
  //       return true
  //     default:
  //       handleShowAlert('error', 'OAuth error')
  //       return false
  //   }
  // }, [])

  return {
    handleSetScore,
    getLeaderboardData,
    error,
  }
}

export default useAuth
