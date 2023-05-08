import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import cn from './ThemePage.module.scss'
import { messages, topics, Message } from './Forum'
import Button from '../UI/Button'
import removePathSuffix from '../../utils/removePathSuffix'

const ThemePage: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams<{ id: string }>()
  const [state, setState] = React.useState(messages)
  const { register, handleSubmit, reset } = useForm<Input>()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state])

  function handleGoBack() {
    navigate(removePathSuffix(pathname))
  }

  const topic = topics.find(f => f.id === Number(id))

  if (!topic) {
    return <div>Theme not found</div>
  }

  //form logic
  type Input = {
    content: string
  }
  const onSubmit: SubmitHandler<Input> = data => {
    const now = new Date()
    const hours = now.getHours().toString()
    const minutes = now.getMinutes().toString()
    const time = `${hours}:${minutes}`
    const message: Message = {
      ...data,
      id: Math.random(), //TODO generic ID
      author: 'currentUser',
      time,
    }
    console.log('Message data : ', message)
    setState([...state, message])
    reset({ content: '' })
  }

  return (
    <>
      <nav className={cn.ThemeHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>{topic.title}</h2>
      </nav>

      <section className={cn.MsgContainer}>
        {state.map(message => (
          <div className={cn.Msg} key={message.id}>
            <div className={cn.MsgHeader}>
              <img className={cn.Ava} />
              <span className={cn.Author}>{message.author} </span>
              <span className={cn.Time}>{message.time}</span>
            </div>
            <div className={cn.MsgBody}>{message.content}</div>
            <div ref={messagesEndRef}></div>
          </div>
        ))}
      </section>

      <form className={cn.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={cn.InputSendMsg}
          placeholder="YOUR MESSAGE"
          autoComplete="off"
          {...register('content', { required: true })}
        />
        <Button size="small" type="submit">
          SEND
        </Button>
      </form>
    </>
  )
}

export default ThemePage
