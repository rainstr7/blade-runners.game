import * as React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import { nanoid } from 'nanoid'
import styles from './CreateTheme.module.scss'
import Button from '../UI/Button';
import { Topic } from './Forum';


export const CreateTheme: React.FC = () => {
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  function handleSubmit(event: SubmitEvent) {
  event.preventDefault(); 
  const themeTitle: HTMLInputElement = event.target!.elements.title;
  const title: string = themeTitle.value;
  const newTopic: Topic = {id: nanoid(10), title, messagesCount: 0, messages: []}
  //topics.push(newTopic)
  themeTitle.value = ''
  console.log('New Topic : ',newTopic);
  }

  return (
    <div>
      <div className={styles.ThemeHeader}>
        <Button size='small' onClick={handleGoBack}>Back</Button>
        <h2>topic.title</h2>
      </div>
      <form className={styles.FormSendMsg} onSubmit={handleSubmit}>
        <input className={styles.InputSendMsg} name='title' placeholder='NEW TITLE THEME' autoComplete='off'/>
        <Button size='small' >CREATE</Button>
        </form>
      </div>
  )
}