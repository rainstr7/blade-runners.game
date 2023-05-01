import { useState } from 'react'
// import cn from './style.module.scss'
// import Button from '../../components/UI/Button'
// import ButtonLink from '../../components/UI/ButtonLink'
// import Layout from '../../components/HOC/Layout'

const LeaderBoard = () => {

  const data = [
    {
      player_id: '32',
      player_avatar: '',
      player_name: 'Keks Ovalniy',
      player_score: '432'
    },
    {
      player_id: '12',
      player_avatar: '',
      player_name: 'Keks Ovalniy1',
      player_score: '213'
    },
    {
      player_id: '53',
      player_avatar: '',
      player_name: 'Keks Ovalniy2',
      player_score: '123'
    }
  ]

  const [playersData, setPlayersData] = useState(data)


  return (
    <div className="layout">
      <main>
        <button>Back</button>
        <div className="list">
          <div className="list-header">
            Player
            Score
          </div>
          <div className="list-content">
            {playersData.map(item => (
              <div className="list-item card" key={item.player_id}>
                <div className="list-item__player">
                  <div className="avatar">{item.player_avatar}</div>
                  <div className="list-item__name">{item.player_name}</div>
                </div>
                <div className="list-item__score">{item.player_score}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default LeaderBoard
