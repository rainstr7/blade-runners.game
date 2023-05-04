import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LeaderBoard from './views/Leaderboard'
import SignUp from './views/SignUp'
import Auth from './views/Auth'
import Layout from './components/Layout'
import Start from './views/Start'
import Game from './views/Game'
import { Forum } from './components/Forum/Forum'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/game" element={<Game />} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/rating" element={<LeaderBoard />} />
        <Route path="/forum/*" element={<Forum />} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Layout>
  )
}

export default App
