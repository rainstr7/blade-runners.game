import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import React from 'react'
import Forum from '../index'
import useForum from '../../../hooks/useForum'

const CreateTheme = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>()
  const navigate = useNavigate()
  const { handleAddForum } = useForum()

  function handleGoBack() {
    navigate(-1)
  }

  //form logic
  const onSubmit: SubmitHandler<FieldValues> = async data => {
    reset()
    await handleAddForum(data.title)
    navigate('/forum')
  }

  return (
    <Forum>
      <div>
        <div>
          <div className={cn.ThemeHeader}>
            <Button size="small" onClick={handleGoBack}>
              Back
            </Button>
            <h2>Current forum</h2>
          </div>
          <form className={cn.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="NEW TITLE THEME"
              autoComplete="off"
              name="title"
              register={register}
              options={{ required: true }}
            />
            <Button size="small" type="submit">CREATE</Button>
          </form>
        </div>
      </div>
    </Forum>
  )
}

export default CreateTheme
