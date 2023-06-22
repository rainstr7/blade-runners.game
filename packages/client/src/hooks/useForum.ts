import useHttp from './useHttp'
import useAlert from './useAlert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { forumsDB, messagesDB } from '../store/reduces/forumReducer'
import {
  addEmoji,
  addMessage,
  addTopic,
  delEmoji,
  delMessage,
  delTopic,
  forumsDownload,
  messagesDownload,
} from '../store/actions/forum'
import { hideLoader, showLoader } from '../store/actions/loading'
import {
  ForumType,
  IRootStore,
  MessagesPayloadInterface,
} from '../store/reduces/interfaces'
import { EmojiClickData } from 'emoji-picker-react'
type Data = { data: ForumType | MessagesPayloadInterface; status: number }
const getData = (data: string, id = 0): Promise<Data> =>
  new Promise(resolve => {
    switch (data) {
      case 'forums':
        setTimeout(() => resolve({ status: 200, data: { ...forumsDB } }), 500)
        break
      case 'messages':
        setTimeout(
          () =>
            resolve({ status: 200, data: { ...messagesDB[`${id}`] } ?? {} }),
          500
        )
        break
    }
  })
const useForum = () => {
  const { /*request,*/ error } = useHttp()
  const { handleShowAlert } = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { forums } = useSelector((state: IRootStore) => state.forum)

  useEffect(() => {
    if (error) {
      handleShowAlert('error', error)
    }
  }, [error])

  const getForumsList = useCallback(async () => {
    // const { status, data } = await request(getForumList)
    dispatch(showLoader())
    const { status, data } = await getData('forums')
    switch (status) {
      case 200:
        dispatch(forumsDownload({ ...data, ...forums } as ForumType))
        dispatch(hideLoader())
        navigate('/forum')
        handleShowAlert('success', 'forums has been successfully downloaded')
        return true
      default:
        return false
    }
  }, [])

  const getMessagesList = useCallback(
    async (forumID: number, topicID: number) => {
      const body = {
        forumID,
        topicID,
      }
      console.log('BODY', body)
      // const { status, data } = await request(getForumList, 'POST', body)
      dispatch(showLoader())
      const { status, data } = await getData('messages', topicID)
      switch (status) {
        case 200:
          dispatch(messagesDownload(data as MessagesPayloadInterface))
          dispatch(hideLoader())
          navigate(`/discuss/${forums[forumID].topics[topicID].title}`)
          Object.keys(data).length === 0
            ? handleShowAlert('warning', 'topic is empty')
            : handleShowAlert(
                'success',
                'messages has been successfully downloaded'
              )
          return true
        default:
          return false
      }
    },
    []
  )

  const handleAddEmoji = useCallback(
    (emoji: EmojiClickData, messageID: number) => {
      const body = {
        messageID,
        emoji,
      }
      console.log('BODY', body)
      dispatch(addEmoji(body))
    },
    []
  )

  const handleDelEmoji = useCallback(
    (emoji: EmojiClickData, messageID: number) => {
      const body = {
        messageID,
        emoji,
      }
      console.log('BODY', body)
      dispatch(delEmoji(body))
    },
    []
  )

  const handleAddMessage = useCallback(
    (
      messageID: number,
      content: string,
      author = 'No Name',
      avatar?: string
    ) => {
      const body = {
        messageID,
        content,
        author,
        avatar,
        date: new Date(),
        emoji: [],
      }
      console.log('BODY', body)
      dispatch(addMessage(body))
    },
    []
  )

  const handleDelMessage = useCallback((messageID: number) => {
    const body = {
      messageID,
    }
    console.log('BODY', body)
    dispatch(delMessage(body))
  }, [])

  const handleAddTopic = useCallback((forumID: number, title: string) => {
    const body = {
      forumID,
      title,
      messagesCount: 0,
    }
    console.log('BODY', body)
    dispatch(addTopic(body))
  }, [])

  const handleDelTopic = useCallback((forumID: number, topicID: number) => {
    const body = {
      forumID,
      topicID,
    }
    console.log('BODY', body)
    dispatch(delTopic(body))
  }, [])

  return {
    getForumsList,
    getMessagesList,
    handleAddEmoji,
    handleDelEmoji,
    handleAddMessage,
    handleDelMessage,
    handleAddTopic,
    handleDelTopic,
  }
}

export default useForum
