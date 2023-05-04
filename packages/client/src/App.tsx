import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LeaderBoard from './views/Leaderboard'
import SignUp from './views/SignUp'
import Auth from './views/Auth'
import Layout from './components/Layout'
import Start from './views/Start'
import { Game } from './views/Game'
import Profile from './views/Profile'

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
        <Route path="/settings" element={<Profile />} />
        <Route path="/rating" element={<LeaderBoard />} />
        <Route path="/forum/*" element={<div>Forum</div>} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Layout>
  )
}

export default App
