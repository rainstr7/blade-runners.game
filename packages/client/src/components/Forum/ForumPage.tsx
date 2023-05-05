import * as React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './ForumPage.module.scss'
import { forums, topics } from './Forum'
import Button from '../UI/Button'
import { Topic, Forum } from './Forum'

export const ForumPage: React.FC = () => {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate('/forum')
  }

  function handleGoCreate() {
    navigate('/forum/newtheme')
  }

  const { id } = useParams<{ id: string }>()
  const forum: Forum | undefined = forums.find(f => f.id === id)

  if (!forum) {
    // если форум с таким id не найден, отображаем страницу ошибки
    return <div>Форум не найден</div>
  }

  return (
    <div>
      <nav className={styles.TopicHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>{forum.title}</h2>
        <Button size="small" onClick={handleGoCreate}>
          CREATE THEME
        </Button>
      </nav>
      <ul className={styles.ListContainer}>
        <li className={styles.ListElement}>
          <div className={styles.HeaderContainer}>
            <div className={styles.TitleHeader}>THEME</div>
            <div className={styles.MsgCountHeader}>COMMENTS</div>
          </div>
        </li>
        {topics.map((topic: Topic) => (
          <li className={styles.ListElement} key={topic.id}>
            <Link
              className={styles.LinkElement}
              to={`/forum/${forum.id}/${topic.id}`}>
              <div className={styles.Title}>{topic.title}</div>
              <div className={styles.MsgCount}>{topic.messagesCount}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
