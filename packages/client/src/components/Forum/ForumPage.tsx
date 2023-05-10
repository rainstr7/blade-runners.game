import { Link, useNavigate, useParams } from 'react-router-dom'
import cn from './ForumPage.module.scss'
import Button from '../UI/Button'
import { forums, topics } from '../../views/Forum/forumData'
import { Topic, Forum } from '../../views/Forum/types'
import { PathList } from '../../views/Forum'

const ForumPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  function handleGoBack() {
    navigate(PathList.forum)
  }

  function handleGoCreate() {
    navigate(PathList.createTheme)
  }

  const forum: Forum | undefined = forums.find(f => f.id === Number(id))

  if (!forum) {
    return <div>Forum not found</div>
  }

  return (
    <>
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
    </>
  )
}

export default ForumPage
