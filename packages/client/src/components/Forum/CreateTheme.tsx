import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useForm, SubmitHandler } from 'react-hook-form'
import cn from './CreateTheme.module.scss'
import Button from '../UI/Button'
import { Topic } from './Forum'

export const CreateTheme: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Input>()
  const navigate = useNavigate()

  //navigation
  function handleGoBack() {
    navigate(-1)
  }

  //form logic
  type Input = {
    title: string
  }
  const onSubmit: SubmitHandler<Input> = data => {
    const now = new Date().toString()
    const topic: Topic = {
      ...data,
      id: nanoid(10),
      messagesCount: 0,
      messages: [],
    }
    console.log('Topic data : ', topic)
    reset({ title: '' })
  }

  return (
    <div>
      <div className={cn.ThemeHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>topic.title</h2>
      </div>
      <form className={cn.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={cn.InputSendMsg}
          placeholder="NEW TITLE THEME"
          autoComplete="off"
          {...register('title', { required: true })}
        />
        <Button size="small">CREATE</Button>
      </form>
    </div>
  )
}
