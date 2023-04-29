import { useEffect } from 'react'
import './App.css'
import { Game } from './views/Game'
import { Finish } from './views/Finish'

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
    <Finish />
  </div>
}

export default App
