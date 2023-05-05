import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'
import { useForm, SubmitHandler } from 'react-hook-form'
import styles from './CreateTheme.module.scss'
import Button from '../UI/Button';
import { Topic } from './Forum';


export const CreateTheme: React.FC = () => {
  //navigation
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  //form logic
  type Input = {
    title: string
  }
  const { register, handleSubmit, reset } = useForm<Input>()
  const onSubmit: SubmitHandler<Input> = data => {
    const topic: Topic = {...data, id: nanoid(10), messagesCount: 0, messages: []}
    console.log('Topic data : ', topic)
    reset({ title: '' })
  }

  return (
    <div>
      <div className={styles.ThemeHeader}>
        <Button size='small' onClick={handleGoBack}>Back</Button>
        <h2>topic.title</h2>
      </div>
      <form className={styles.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.InputSendMsg} placeholder='NEW TITLE THEME' autoComplete='off' {...register('title', {required: true})} />
        <Button size='small' >CREATE</Button>
        </form>
      </div>
  )
}