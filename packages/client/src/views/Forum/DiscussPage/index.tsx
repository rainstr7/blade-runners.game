import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import Forum from '../index'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../../store/reduces/interfaces'
import useAlert from '../../../hooks/useAlert'
import Message from './Message'
import { EmojiClickData } from 'emoji-picker-react'
import useForum from '../../../hooks/useForum'

const DiscussPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<FieldValues>()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const { selectedTopic } = useParams()
  const { display_name, avatar } = useSelector(
    (state: IRootStore) => state.user
  )
  const { messages } = useSelector((state: IRootStore) => state.forum)
  const { handleShowAlert } = useAlert()
  const { handleAddEmoji, handleDelEmoji, handleAddMessage, handleDelMessage } = useForum()
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const [idModalEmoji, setIdModalEmoji] = useState<number>(0)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleGoBack = () => {
    navigate(-1)
  }

  if (!messages) {
    handleShowAlert('error', 'MESSAGES NOT FOUND')
    navigate('/forum')
    return null
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    handleAddMessage(
      Object.keys(messages).length + 1,
      data.content,
      display_name,
      avatar
    )
    reset({ content: '' })
  }

  const handleAddNewEmoji = useCallback((emoji: EmojiClickData, id: string) => {
    setIdModalEmoji(0)
    handleAddEmoji(emoji, +id)
  }, [])

  const handleDelOldEmoji = useCallback((emoji: EmojiClickData, id: string) => {
    handleDelEmoji(emoji, +id)
  }, [])

  const handleToggleEmoji = (
    events: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    events.stopPropagation()
    const { id } = events.currentTarget
    setIdModalEmoji(prevState => (prevState === +id ? 0 : +id))
  }

  const handleDelOwnMessage = useCallback((id: string) => {
    handleDelMessage(+id)
  }, [])

  return (
    <Forum onClick={handleToggleEmoji} id="0">
      <nav className={cn.ThemeHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>{selectedTopic}</h2>
      </nav>
      <section className={cn.MsgContainer}>
        {Object.keys(messages).length === 0 ? (
          <div>Empty topic</div>
        ) : (
          Object.entries(messages).map(
            ([id, { avatar, content, author, date, emoji }], index, array) => (
              <Message
                key={id}
                id={id}
                avatar={avatar}
                content={content}
                author={author}
                date={date}
                ref={index === array.length - 1 ? messagesEndRef : undefined}
                emoji={emoji}
                addEmoji={handleAddNewEmoji}
                delEmoji={handleDelOldEmoji}
                isOpenEmojiList={idModalEmoji === +id}
                handleToggleEmoji={handleToggleEmoji}
                isOwnMessage={display_name === author}
                handleDelOwnMessage={handleDelOwnMessage}
              />
            )
          )
        )}
      </section>
      <form className={cn.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="YOUR MESSAGE"
          autoComplete="off"
          name="content"
          options={{ required: true }}
          register={register}
        />
        <Button size="small" type="submit">
          SEND
        </Button>
      </form>
    </Forum>
  )
}

export default DiscussPage
