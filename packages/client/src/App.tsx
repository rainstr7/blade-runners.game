import { useEffect } from 'react'
import './App.css'
import { Game } from './views/Game'

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
  // TODO Router
  return <div className="App">
    <Game />
  </div>
}

export default App
