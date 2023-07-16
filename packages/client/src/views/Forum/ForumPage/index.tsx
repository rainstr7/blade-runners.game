import { useNavigate } from 'react-router-dom'
import cn from './style.module.scss'
import Button from '../../../components/UI/Button'
import Forum from '../index'
import React, { useCallback, useEffect } from 'react'
import useForum from '../../../hooks/useForum'
import DeleteButton from '../../../components/UI/DeleteButton'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../../store/reduces/interfaces'

const ForumPage = () => {
  const navigate = useNavigate()
  const { forums } = useSelector((state: IRootStore) => state.forum)
  const { getForumsList, handleDelForum } = useForum()

  useEffect(() => {
    ;(async () => await getForumsList())()
  }, [])

  const handleGoCreate = useCallback(() => {
    navigate('/create-theme')
  }, [])

  const handleGoToStart = () => {
    navigate('/start')
  }

  const handleDownloadMessages = useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { id } = event.currentTarget
      navigate(`/discuss/${id}`)
    },
    []
  )
  const handleDeleteForum = async (id: string) => {
    await handleDelForum(id)
  }
  return (
    <Forum>
      <nav>
        <Button size="small" onClick={handleGoToStart}>
          Back
        </Button>
        <h2>Forums</h2>
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
        {forums.map(({ id, title, messagesCount }) => (
          <li className={cn.ButtonElement} key={id}>
            <div className={cn.Topic}>
              <div
                className={cn.Title}
                onClick={handleDownloadMessages}
                id={String(id)}>
                {title}
              </div>
              <div className={cn.MsgCount}>{messagesCount}</div>
              <div className={cn.DelButtonWrapper}>
                <DeleteButton onClick={() => handleDeleteForum(`${id}`)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Forum>
  )
}

export default ForumPage
