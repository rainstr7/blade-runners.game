import { Link, useNavigate } from 'react-router-dom'
import cn from './ForumList.module.scss'
import { forums } from '../../views/Forum/forumData'
import Button from '../UI/Button'
import { PathList } from '../../views/Forum'

const ForumList: React.FC = () => {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(PathList.start)
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
          {forums.map(forum => (
            <li className={cn.ListElement} key={forum.id}>
              <Link className={cn.LinkElement} to={`/forum/${forum.id}`}>
                <div className={cn.Title}>{forum.title}</div>
                <div className={cn.TopicCount}>{forum.topicsCount}</div>
                <div className={cn.MsgCount}>{forum.messagesCount}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ForumList
