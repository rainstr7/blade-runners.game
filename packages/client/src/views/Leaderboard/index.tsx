import { useState } from 'react'
import cn from './style.module.scss'
import Avatar from '../../components/UI/Avatar'
import CardLink from '../../components/UI/CardLink'

const data = [
  {
    id: Math.random(),
    image:
      'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
    name: 'Keks Ovalniy',
    score: Math.floor(Math.random() * (10000000000 - 1) + 1),
  },
  {
    id: Math.random(),
    image:
      'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
    name: 'Keks Ovalniy1',
    score: Math.floor(Math.random() * (10000000000 - 1) + 1),
  },
  {
    id: Math.random(),
    image:
      'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
    name: 'Keks Ovalniy2',
    score: Math.floor(Math.random() * (10000000000 - 1) + 1),
  },
]

const LeaderBoard = () => {
  const [playersData] = useState(data)

  return (
    <main className={cn.leaderboard}>
      <div className={cn.title}>
        <CardLink to="/">Back</CardLink>
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
