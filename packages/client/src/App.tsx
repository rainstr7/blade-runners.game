import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LeaderBoard from './views/Leaderboard'
import SignUp from './views/SignUp'
import Auth from './views/Auth'
import Layout from './components/Layout'
import Start from './views/Start'
import Game from './views/Game'
import Profile from './views/Profile'
import Main from './views/Main'
import Forum from './views/Forum'
import { changeLayout } from './store/actions/changeLayout'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorComponent from './components/Error/ErrorComponent'

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
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Main changeLayout={changeLayout} />} />
          <Route path="/start" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/game" element={<Game />} />
          <Route path="/settings" element={<Profile />} />
          <Route path="/rating" element={<LeaderBoard />} />
          <Route path="/forum/*" element={<Forum />} />
          <Route path="/500" element={<ErrorComponent errorCode={500} />} />
          <Route path="*" element={<ErrorComponent errorCode={404} />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}

export default App
