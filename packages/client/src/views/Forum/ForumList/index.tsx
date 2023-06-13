import { Link, useNavigate } from 'react-router-dom'
import cn from './style.module.scss'
import { forums } from '../forumData'
import Button from '../../../components/UI/Button'
import { FC } from 'react'
import Forum from '../index'

const ForumList: FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Forum>
      <nav>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
      </nav>
      <div className={cn.ListContainer}>
        <ul className={cn.List}>
          <li className={cn.ListElement}>
            <div className={cn.HeaderContainer}>
              <div className={cn.TitleHeader}>FORUMS/SOCIAL</div>
              <div className={cn.TopicCountHeader}>TRENDS</div>
              <div className={cn.MsgCountHeader}>COMMENTS</div>
            </div>
          </li>
          {forums.map(({ id, title, topicsCount, messagesCount }) => (
            <li className={cn.ListElement} key={id}>
              <Link className={cn.LinkElement} to={`/forum/${id}`}>
                <p className={cn.Title}>{title}</p>
                <p className={cn.TopicCount}>{topicsCount}</p>
                <p className={cn.MsgCount}>{messagesCount}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Forum>
  )
}

export default ForumList
