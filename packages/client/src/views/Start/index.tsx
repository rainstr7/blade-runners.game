import Button from '../../components/UI/Button'
import Layout from '../../components/Layout'
import cn from './style.module.scss'

const Start = () => {
  return (
    <Layout>
      <main className={cn.Block}>
        <div className={cn.MainButtonGroup}>
          <Button>Start Game</ Button>
          <Button>Settings</Button>
        </div>
        <div className={cn.AdditionalButtonGroup}>
          <Button size='small'>Leaderboard</Button>
          <Button size='small'>Forum</Button>
        </div>
      </main>
    </Layout>
  )
}

export default Start
