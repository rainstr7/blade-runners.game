import { useState } from 'react'
import cn from './style.module.scss'
import Avatar from '../../components/UI/Avatar'
import CardLink from '../../components/UI/CardLink'
import { data, LeaderBoardInterface } from './settings'

const LeaderBoard = () => {
  const [playersData, setPlayersData] = useState<LeaderBoardInterface[]>(data)

  return (
    <main className={cn.leaderboard}>
      <div className={cn.title}>
        <CardLink to="/start">Back</CardLink>
        LeaderBoard
        <div className="empty" />
      </div>
      <div className={cn.list}>
        <div className={cn.header}>
          <span>Player</span>
          <span>Score</span>
        </div>
        {playersData.map(item => (
          <div className={cn.item} key={item.id}>
            <div className={cn.name}>
              <Avatar src={item.image} />
              <span style={{ marginLeft: 10 }}>{item.name}</span>
            </div>
            {item.score}
          </div>
        ))}
      </div>
    </main>
  )
}

export default LeaderBoard
