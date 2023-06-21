import { Link, useNavigate } from 'react-router-dom'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import Forum from '../index'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../../store/reduces/interfaces'
import { useEffect } from 'react'
import useForum from '../../../hooks/useForum'

const ForumPage = () => {
  const navigate = useNavigate()
  const { forums } = useSelector((state: IRootStore) => state.forum)
  const { getForumsList } = useForum()

  useEffect(() => {
    getForumsList().catch()
  }, [])

  const handleGoToStart = () => {
    navigate('/start')
  }

  return (
    <Forum>
      <nav>
        <Button size="small" onClick={handleGoToStart}>
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
          {Object.entries(forums).map(
            ([id, { title, topicsCount, messagesCount }]) => {
              return (
                <li className={cn.ListElement} key={id} >
                  <Link className={cn.LinkElement} to={`/topics/${id}`}>
                    <p className={cn.Title}>{title}</p>
                    <p className={cn.TopicCount}>{topicsCount}</p>
                    <p className={cn.MsgCount}>{messagesCount}</p>
                  </Link>
                </li>
              )
            }
          )}
        </ul>
      </div>
    </Forum>
  )
}

export default ForumPage
