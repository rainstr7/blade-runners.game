import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

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
      <Routes>
        <Route path="/" element={<div>Main</div>} />
        <Route path="/signup" element={<div>Sign up / Registration</div>} />
        <Route path="/signin" element={<div>Sign in / Login</div>} />
        <Route path="/game" element={<div>Game</div>} />
        <Route path="/settings" element={<div>Settings</div>} />
        <Route path="/rating" element={<div>Leaderboard</div>} />
        <Route path="/forum/*" element={<div>Forum</div>} />
        <Route path="*" element={<div>Страница не найдена</div>} />
      </Routes>
  )

}

export default App
