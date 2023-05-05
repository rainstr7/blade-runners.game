import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ForumList.module.scss'
import { forums } from './Forum'
import Button from '../UI/Button'

export const ForumList: React.FC = () => {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate('/')
  }

  return (
    <div>
      <nav>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
      </nav>
      <div className={styles.ListContainer}>
        <ul className={styles.List}>
          <li className={styles.ListElement}>
            <div className={styles.HeaderContainer}>
              <div className={styles.TitleHeader}>FORUMS/SOCIAL</div>
              <div className={styles.TopicCountHeader}>TRENDS</div>
              <div className={styles.MsgCountHeader}>COMMENTS</div>
            </div>
          </li>
          {forums.map(forum => (
            <li className={styles.ListElement} key={forum.id}>
              <Link className={styles.LinkElement} to={`/forum/${forum.id}`}>
                <div className={styles.Title}>{forum.title}</div>
                <div className={styles.TopicCount}>{forum.topicsCount}</div>
                <div className={styles.MsgCount}>{forum.messagesCount}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
