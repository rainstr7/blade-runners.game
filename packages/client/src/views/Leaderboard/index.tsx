import { useEffect, useContext } from 'react'
import cn from './style.module.scss'
import Avatar from '../../components/UI/Avatar'
import CardLink from '../../components/UI/CardLink'
import useScore from '../../hooks/useScore'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store/reduces/interfaces'
import getAvatarFullUrl from '../../utils/getFullAvatarUrl'
import { Player } from '../interfaces'
import { ThemeContext } from '../../components/Theme'

const LeaderBoard = () => {
  const { getLeaderboardData } = useScore()

  const leaderboard: Array<Player> = useSelector(
    (state: IRootStore) => state.score.leaderboard
  )

  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (leaderboard && leaderboard.length > 0) {
      return
    }
    getLeaderboardData()
  })

  return (
    <main className={cn.leaderboard}>
      <div className={cn.title} style={{color: theme?.defaultColor}}>
        <CardLink to="/start">Back</CardLink>
        LeaderBoard
        <div className="empty" />
      </div>
      <div className={cn.list}>
        <div className={cn.header} style={{color: theme?.defaultColor}}>
          <span>Player</span>
          <span>Score</span>
        </div>
        {leaderboard.map((item: Player) => (
          <div className={cn.item} key={item.rating}>
            <div className={cn.name}>
              <Avatar
                name={item.player.display_name}
                src={getAvatarFullUrl(item.player.avatar)}
              />
            </div>
            {item.rating}
          </div>
        ))}
      </div>
    </main>
  )
}

export default LeaderBoard
