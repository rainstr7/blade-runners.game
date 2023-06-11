import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import cn from './CreateTheme.module.scss'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { Topic } from '../../views/Forum/types'

const CreateTheme: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>()
  const navigate = useNavigate()

  //navigation
  function handleGoBack() {
    navigate(-1)
  }

  //form logic
  const onSubmit: SubmitHandler<FieldValues> = data => {
    const topic: Topic = {
      title: data.title,
      id: Math.random(), //TODO generic ID
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
        <Button size="small">CREATE</Button>
      </form>
    </div>
  )
}

export default CreateTheme
