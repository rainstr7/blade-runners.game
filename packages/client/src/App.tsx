import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './views/SignUp'
import Auth from './views/Auth'
import Layout from './components/Layout'
import { Game } from './views/Game'
import GameOver from './views/GameOver'

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
        <Route path="/" element={<GameOver />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/game" element={<Game />} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/rating" element={<div>Leaderboard</div>} />
        <Route path="/forum/*" element={<div>Forum</div>} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
    </Layout>
  )
}

export default App
