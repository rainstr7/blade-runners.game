import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import cn from './ThemePage.module.scss'
import { messages, topics, Message } from './Forum'
import Button from '../UI/Button'

const ThemePage: React.FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams<{ id: string }>()
  const [state, setState] = React.useState(messages)
  const { register, handleSubmit, reset } = useForm<Input>()

  function removePathSuffix(path: string): string {
    const index = path.lastIndexOf('/')
    if (index >= 0) {
      return path.substring(0, index)
    } else {
      return path
    }
  }

  function handleGoBack() {
    navigate(removePathSuffix(pathname))
  }

  const topic = topics.find(f => f.id === id)

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
    <div>
      <nav className={cn.ThemeHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>{topic.title}</h2>
      </nav>

      <div className={cn.MsgContainer}>
        {state.map(message => (
          <div className={cn.Msg} key={message.id}>
            <div className={cn.MsgHeader}>
              <img className={cn.Ava} />
              <span className={cn.Author}>{message.author} </span>
              <span className={cn.Time}>{message.time}</span>
            </div>
            <div className={cn.MsgBody}>{message.content}</div>
          </div>
        ))}
      </div>

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
    </div>
  )
}

export default ThemePage
