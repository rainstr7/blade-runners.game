import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addScoreResult, leaderboardData } from '../api'
import { FieldValues } from 'react-hook-form'
import useHttp from './useHttp'
import { changeLeaderboardData } from '../store/actions/changeScore'
import useAlert from './useAlert'

interface PlayerRatingData {
  data: {
    player: object
    rating: number
  }
  ratingFieldName?: string
  teamName?: string
}

const newRating: PlayerRatingData = {
  data: {
    player: {},
    rating: 0,
  },
  ratingFieldName: 'rating',
  teamName: 'BladeRunner',
}

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
    const teamName = 'BladeRunner'
    const requestData = {
      ratingFieldName: 'rating',
      cursor: 0,
      limit: 10,
    }

    const { status, data } = await request(
      leaderboardData + teamName,
      'POST',
      requestData
    )
    if (status === 200) {
      const leaderboardData = data.map((item: PlayerRatingData) => {
        return { ...item.data }
      })

      dispatch(changeLeaderboardData(leaderboardData))
    }
  }, [])

  const handleSetScore = async (data: FieldValues) => {
    newRating.data = {
      player: {
        display_name: data.player.display_name,
        avatar: data.player.avatar,
      },
      rating: data.rating,
    }

    const { status } = await request(addScoreResult, 'POST', newRating)
    if (status === 200) {
      handleShowAlert('success', 'Rating added successfully')
      return true
    }
    return false
  }

  return {
    handleSetScore,
    getLeaderboardData,
    error,
  }
}

export default useScore
