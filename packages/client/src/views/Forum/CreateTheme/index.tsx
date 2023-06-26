import { useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import React, { useContext } from 'react'
import Forum from '../index'
import useForum from '../../../hooks/useForum'
import { ThemeContext } from '../../../components/Theme'

const CreateTheme = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>()
  const navigate = useNavigate()
  const { handleAddTopic } = useForum()
  const { selectedForum } = useParams()

  const theme = useContext(ThemeContext)

  function handleGoBack() {
    navigate(-1)
  }
  if (!selectedForum) {
    navigate('/forums')
    return null
  }
  //form logic
  const onSubmit: SubmitHandler<FieldValues> = data => {
    handleAddTopic(+selectedForum, data.title)
    reset({ title: '' })
    navigate(`/topics/${selectedForum}`)
  }

  return (
    <Forum>
      <div>
        <div>
          <div className={cn.ThemeHeader}>
            <Button size="small" onClick={handleGoBack}>
              Back
            </Button>
            <h2 style={{color: theme?.defaultColor}}>Current forum</h2>
          </div>
          <form className={cn.FormSendMsg} onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="NEW TITLE THEME"
              autoComplete="off"
              name="title"
              register={register}
              options={{ required: true }}
            />
            <Button size="small">CREATE</Button>
          </form>
        </div>
      </div>
    </Forum>
  )
}

export default CreateTheme
