import { Link, useNavigate, useParams } from 'react-router-dom'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import { forums, topics } from '../forumData'
import { Topic, ForumType } from '../types'
import Forum from '../index'
import { FC } from 'react'

const ForumPage: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  function handleGoBack() {
    navigate(-1)
  }

  function handleGoCreate() {
    navigate('/forum/newtheme')
  }

  const forum: ForumType | undefined = forums.find(f => f.id === Number(id))

  if (!forum) {
    return <div>Forum not found</div>
  }

  return (
    <Forum>
      <nav className={cn.TopicHeader}>
        <Button size="small" onClick={handleGoBack}>
          Back
        </Button>
        <h2>{forum.title}</h2>
        <Button size="small" onClick={handleGoCreate}>
          CREATE THEME
        </Button>
      </nav>
      <ul className={cn.ListContainer}>
        <li className={cn.ListElement}>
          <div className={cn.HeaderContainer}>
            <div className={cn.TitleHeader}>THEME</div>
            <div className={cn.MsgCountHeader}>COMMENTS</div>
          </div>
        </li>
        {topics.map((topic: Topic) => (
          <li className={cn.ListElement} key={topic.id}>
            <Link
              className={cn.LinkElement}
              to={`/forum/${forum.id}/${topic.id}`}>
              <div className={cn.Title}>{topic.title}</div>
              <div className={cn.MsgCount}>{topic.messagesCount}</div>
            </Link>
          </li>
        ))}
      </ul>
    </Forum>
  )
}

export default ForumPage
