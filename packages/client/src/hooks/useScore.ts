import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addScoreResult, leaderboardData } from '../api'
import { FieldValues } from 'react-hook-form'
import useHttp from './useHttp'
import { changeScore, changeLeaderboardData } from '../store/actions/changeScore'
import useAlert from './useAlert'
interface ratingData {
  data: {
    player: {
      display_name: string | undefined,
      avatar: string | undefined
    },
    rating: number
  },
  ratingFieldName: string,
  teamName: string
}

const newRating: ratingData = {
  data: {
    player: {
      display_name: '',
      avatar: ''
    },
    rating: 0
  },
  ratingFieldName: "rating",
  teamName: "BladeRunner"
}

// FIXME: Ето ломает хук
// const { avatar, display_name } = useSelector(
//   (state: IRootStore) => state.user
// )


const useScore = () => {
  const { request, error } = useHttp()
  const dispatch = useDispatch()
  const { handleShowAlert } = useAlert()
  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
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

  // const handleSetScore = useCallback(async (score: number) => {
    
  //   newRating.data = {
  //     player: { display_name, avatar },
  //     rating: score
  //   }

  //   console.log(newRating)

  //   // const { status, data } = await request(addScoreResult, 'POST', newRating)
  //   // if (status === 200) {
  //   //   dispatch(changeScore(score))
  //   //   // dispatch(cleanProfile())
  //   //   return true
  //   // }
  //   return false
  // }, [])
  const handleSetScore = async (data: FieldValues) => {
    
    newRating.data = {
      player: {
        display_name: data.player.display_name,
        avatar: data.player.avatar
      },
      rating: data.rating
    }

    const { status } = await request(addScoreResult, 'POST', newRating)
    if (status === 200) {
      handleShowAlert('success', 'Rating added successfully')
      return true
    }
    return false
  }

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

export default useScore
