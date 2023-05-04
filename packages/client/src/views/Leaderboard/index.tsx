import { useState } from 'react'
import cn from './style.module.scss'
import ButtonLink from '../../components/UI/ButtonLink'
import Avatar from '../../components/UI/Avatar'

const LeaderBoard = () => {

  const data = [
    {
      id: Math.random(),
      image: 'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
      name: 'Keks Ovalniy',
      score: Math.floor(Math.random() * (10000000000 - 1) + 1)
    },
    {
      id: Math.random(),
      image: 'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
      name: 'Keks Ovalniy1',
      score: Math.floor(Math.random() * (10000000000 - 1) + 1)
    },
    {
      id: Math.random(),
      image: 'https://phonoteka.org/uploads/posts/2021-04/1617802986_26-p-kiberpank-fon-28.jpg',
      name: 'Keks Ovalniy2',
      score: Math.floor(Math.random() * (10000000000 - 1) + 1)
    }
  ]

  const [playersData, setPlayersData] = useState(data)


  return (
    <main className={cn.leaderboard}>
        <div className={cn.title}>
          <ButtonLink to='/' card={true}>Back</ButtonLink>
          LeaderBoard
          <div className="empty"></div>
        </div>
        <div className={cn.list}>
          <div className={cn.header}>
            <span>Player</span>
            <span>Score</span>
          </div>
          {playersData.map(item => (
            <div className={cn.item} key={item.id}>
              <div className={cn.name}>
                <Avatar src={item.image}/>
                <span style={{marginLeft: 10}}>{item.name}</span>
              </div>
              {item.score}
            </div>
          ))}
        </div>
      </main>
  )
}

export default LeaderBoard
