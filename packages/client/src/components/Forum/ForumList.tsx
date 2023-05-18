import { Link, useNavigate } from 'react-router-dom'
import cn from './ForumList.module.scss'
import { forums } from '../../views/Forum/forumData'
import Button from '../UI/Button'
import { FC } from 'react'

const ForumList: FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <>
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
                <div className={cn.Title}>{title}</div>
                <div className={cn.TopicCount}>{topicsCount}</div>
                <div className={cn.MsgCount}>{messagesCount}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ForumList
