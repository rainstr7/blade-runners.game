import * as React from 'react';
import {
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { nanoid } from 'nanoid'
import styles from './ThemePage.module.scss';
// import ava from '../../assets/ava.png'
import { messages, topics, Message } from './Forum'
import Button from '../UI/Button';

export const ThemePage: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function removePathSuffix(path: string): string {
    const index = path.lastIndexOf('/');
    if (index >= 0) {
      return path.substring(0, index);
    } else {
      return path;
    }
  }

  function handleGoBack() {
    navigate(removePathSuffix(pathname));
  }
  const { id } = useParams<{ id: string }>();
  const topic = topics.find((f) => f.id === id);

  if (!topic) {
    // если форум с таким id не найден, отображаем страницу ошибки
    return <div>Тема не найден</div>;
  }

  const [state, setState] = React.useState(messages)

  function handleSubmit(event) {
    event.preventDefault();
    const now: Date = new Date();
    const hours: string = now.getHours().toString().padStart(2, '0');
    const minutes: string = now.getMinutes().toString().padStart(2, '0');
    const time: string = `${hours}:${minutes}`; 
    const messageInput: HTMLInputElement = event.target.elements.message;
    const message: string = messageInput.value;
    messageInput.value = '';
    const newMessage: Message = {id: nanoid(12), author: 'currentUser', content: message, time}
    console.log('Your Message : ',newMessage);
    setState([...state, newMessage])
  }
  
  return (
    <div>
      <nav className={styles.ThemeHeader}>
        <Button size='small' onClick={handleGoBack}>Back</Button>
        <h2>{topic.title}</h2>
      </nav>
      
      <div className={styles.MsgContainer}>
      {state.map((message) => (
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

      <form className={styles.FormSendMsg} onSubmit={handleSubmit}>
        <input className={styles.InputSendMsg}  name='message' placeholder='YOUR MESSAGE' autoComplete='off'/>
        <Button size='small' type='submit'>SEND</Button>
        </form>
    </div>
  );
};

