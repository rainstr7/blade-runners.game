import * as React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { nanoid } from 'nanoid';
import styles from './ThemePage.module.scss'
import { messages, topics, Message } from './Forum'
import Button from '../UI/Button'

export const ThemePage: React.FC = () => {
  //navigation
  const navigate = useNavigate()
  const { pathname } = useLocation()

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

  //find current topic
  const { id } = useParams<{ id: string }>()
  const topic = topics.find(f => f.id === id)

  if (!topic) {
    // если форум с таким id не найден, отображаем страницу ошибки
    return <div>Тема не найден</div>
  }

  //state
  const [state, setState] = React.useState(messages)

  //form logic
  type Input = {
    content: string
  }
  const { register, handleSubmit, reset } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = data => {
    const now = new Date()
    const hours = now.getHours().toString()
    const minutes = now.getMinutes().toString()
    const time = `${hours}:${minutes}`
    const message: Message = {
      ...data,
      id: nanoid(10),
      author: 'currentUser',
      time,
    }
    console.log('Message data : ', message)
    setState([...state, message])
    reset({ content: '' })
  }

  return (
    <div>
      <nav className={styles.ThemeHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>{topic.title}</h2>
      </nav>

      <div className={styles.MsgContainer}>
        {state.map(message => (
          <div className={styles.Msg} key={message.id}>
            <div className={styles.MsgHeader}>
              <img className={styles.Ava} />
              <span className={styles.Author}>{message.author} </span>
              <span className={styles.Time}>{message.time}</span>
            </div>
            <div className={styles.MsgBody}>{message.content}</div>
          </div>
        ))}
      </div>

      <form className={styles.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.InputSendMsg}
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
