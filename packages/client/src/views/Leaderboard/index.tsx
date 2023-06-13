import { useEffect } from 'react'
import cn from './style.module.scss'
import Avatar from '../../components/UI/Avatar'
import CardLink from '../../components/UI/CardLink'
import useScore from '../../hooks/useScore'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'
import getAvatarFullUrl from '../../utils/getFullAvatarUrl'
interface Item {
  player: {
    display_name: string | undefined,
    avatar: string | undefined
  }
  rating: number
}

const LeaderBoard = () => {
  const {getLeaderboardData} = useScore()

  const leaderboard: Array<Item> = useSelector(
    (state: IRootStore) => state.score.leaderboard
  )

  useEffect(() => {
    if (leaderboard && leaderboard.length > 0) {
      return
    }
    getLeaderboardData()
  })

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
        {leaderboard.map((item: Item) => (
          <div className={cn.item} key={item.rating}>
            <div className={cn.name}>
              <Avatar name={item.player.display_name} src={getAvatarFullUrl(item.player.avatar)} />
            </div>
            {item.rating}
          </div>
        ))}
      </div>
    </main>
  )
}

export default LeaderBoard
