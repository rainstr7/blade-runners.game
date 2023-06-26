import { useNavigate, useParams } from 'react-router-dom'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import Forum from '../index'
import React, { useCallback, useContext } from 'react'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../../store/reduces/interfaces'
import useAlert from '../../../hooks/useAlert'
import useForum from '../../../hooks/useForum'
import DeleteButton from '../../../components/UI/DeleteButton'
import { ThemeContext } from '../../../components/Theme'

const TopicPage = () => {
  const navigate = useNavigate()
  const { forums } = useSelector((state: IRootStore) => state.forum)
  const { selectedForum } = useParams()
  const { handleShowAlert } = useAlert()
  const { getMessagesList, handleDelTopic } = useForum()

  const theme = useContext(ThemeContext)

  if (!selectedForum || !forums[selectedForum]) {
    handleShowAlert('error', 'FORUM NOT FOUND')
    navigate('/forum')
    return null
  }
  const handleGoToForumList = useCallback(() => {
    navigate('/forum')
  }, [])

  const handleGoCreate = useCallback(() => {
    navigate(`/forum/newtheme/${selectedForum}`)
  }, [])

  const handleDownloadMessages = useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { id } = event.currentTarget
      await getMessagesList(+selectedForum, +id)
    },
    []
  )

  return (
    <Forum>
      <nav className={cn.TopicHeader}>
        <Button size="small" onClick={handleGoToForumList}>
          Back
        </Button>
        <h2 style={{color: theme?.defaultColor}}>{forums[selectedForum].title}</h2>
        <Button size="small" onClick={handleGoCreate}>
          CREATE THEME
        </Button>
      </nav>
      <ul className={cn.ListContainer}>
        <li className={cn.ListElement}>
          <div className={cn.HeaderContainer} style={{color: theme?.defaultColor}}>
            <div className={cn.TitleHeader}>THEME</div>
            <div className={cn.MsgCountHeader}>COMMENTS</div>
          </div>
        </li>
        {Object.entries(forums[selectedForum].topics).map(
          ([topicID, { title, messagesCount }]) => (
            <li className={cn.ButtonElement} key={topicID}>
              <div className={cn.Topic}>
                <div
                  className={cn.Title}
                  onClick={handleDownloadMessages}
                  id={topicID}>
                  {title}
                </div>
                <div className={cn.MsgCount}>{messagesCount}</div>
                <div className={cn.DelButtonWrapper}>
                  <DeleteButton
                    onClick={() => {
                      handleDelTopic(+selectedForum, +topicID)
                    }}
                  />
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </Forum>
  )
}

export default TopicPage
