import Button from '../../components/UI/Button'
import cn from './style.module.scss'

const Start = () => {
  return (
    <main className={cn.Block}>
      <div className={cn.MainButtonGroup}>
        <Button>Start Game</Button>
        <Button>Settings</Button>
      </div>
      <div className={cn.AdditionalButtonGroup}>
        <Button size="small">Leaderboard</Button>
        <Button size="small">Forum</Button>
      </div>
    </main>
  )
}

export default Start
