import useHttp from './useHttp'
import useAlert from './useAlert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { addForum, forumsDownload } from '../store/actions/forum'
import { topic } from '../api'
import { IRootStore } from '../store/reduces/interfaces'

const useForum = () => {
  const { request, error } = useHttp()
  const { handleShowAlert } = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state: IRootStore) => state)

  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
    }
  }, [error])

  const getForumsList = useCallback(async () => {
    const { status, data } = await request(topic)
    switch (status) {
      case 200:
        console.log('TOPICS', data)
        dispatch(forumsDownload(data))
        navigate('/forum')
        handleShowAlert('success', 'forums has been successfully downloaded')
        return true
      default:
        return false
    }
  }, [])

  const handleAddForum = useCallback(async (title: string) => {
    const body = {
      title,
      userID: user.id
    }
    const { status, data } = await request(topic, 'POST', body)
    switch (status) {
      case 200:
        dispatch(addForum(data))
        navigate(`/discuss/${data?.id}`)
        handleShowAlert('success', 'forums has been successfully created')
        return true
      default:
        return false
    }
    // dispatch(addTopic(body))
  }, [])

  const handleDelForum = useCallback(async (forumID: string) => {
    const body = {
      forumID,
      userID: user.id
    }
    const { status, data } = await request(topic, 'DELETE', body)
    switch (status) {
      case 200:
        dispatch(forumsDownload(data))
        handleShowAlert('success', 'forums has been successfully deleted')
        return true
      default:
        return false
    }


    // dispatch(addTopic(body))
  }, [])

  return {
    getForumsList,
    handleAddForum,
    handleDelForum
  }
}

export default useForum
