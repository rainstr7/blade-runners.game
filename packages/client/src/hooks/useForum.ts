import useHttp from './useHttp'
import useAlert from './useAlert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import {
  addForum,
  addMessage,
  forumsDownload,
  messagesDownload,
} from '../store/actions/forum'
import { emoji, forums, messages } from '../api'
import { IRootStore } from '../store/reduces/interfaces'
import { EmojiClickData } from 'emoji-picker-react'

const useForum = () => {
  const { request, error } = useHttp()
  const { handleShowAlert } = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: IRootStore) => state)

  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
    }
  }, [error])

  const getForumsList = useCallback(async () => {
    const { status, data } = await request(forums)
    switch (status) {
      case 200:
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
      userID: user.id,
    }
    const { status, data } = await request(forums, 'POST', body)
    switch (status) {
      case 200:
        dispatch(addForum(data))
        navigate(`/discuss/${data?.id}`)
        handleShowAlert('success', 'forums has been successfully created')
        return true
      default:
        return false
    }
  }, [])

  const handleDelForum = useCallback(async (forumID: string) => {
    const body = {
      forumID,
      userID: user.id,
    }
    const { status, data } = await request(forums, 'DELETE', body)
    switch (status) {
      case 200:
        dispatch(forumsDownload(data))
        handleShowAlert('success', 'forums has been successfully deleted')
        return true
      default:
        return false
    }
  }, [])

  const getMessagesList = useCallback(async (selectedForum: string) => {
    const { status, data } = await request(
      `${messages}?forumID=${selectedForum}`
    )
    switch (status) {
      case 200:
        dispatch(messagesDownload(data))
        handleShowAlert('success', 'messages has been successfully downloaded')
        return true
      default:
        return false
    }
  }, [])

  const handleAddMessage = useCallback(
    async (forumID: string, message: string) => {
      const body = {
        userID: user.id,
        forumID,
        message,
      }
      const { status, data } = await request(messages, 'POST', body)
      switch (status) {
        case 200:
          dispatch(addMessage(data))
          return true
        default:
          return false
      }
    },
    []
  )

  const handleDelMessage = useCallback(
    async (forumID: string, messageID: string) => {
      const body = {
        userID: user.id,
        forumID,
        messageID,
      }
      const { status, data } = await request(messages, 'DELETE', body)
      switch (status) {
        case 200:
          dispatch(messagesDownload(data))
          handleShowAlert('success', 'message has been successfully deleted')
          return true
        default:
          return false
      }
    },
    []
  )

  const handleAddEmoji = useCallback(
    async (messageID: number, forumID: number, newEmoji: EmojiClickData) => {
      const body = {
        userID: user.id,
        forumID,
        messageID,
        emoji: newEmoji,
      }
      const { status, data } = await request(emoji, 'POST', body)
      switch (status) {
        case 200:
          console.log(data)
          return true
        default:
          return false
      }
    },
    []
  )

  return {
    getForumsList,
    handleAddForum,
    handleDelForum,
    getMessagesList,
    handleAddMessage,
    handleDelMessage,
    handleAddEmoji,
  }
}

export default useForum
