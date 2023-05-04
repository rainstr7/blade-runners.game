import { useEffect } from 'react'
import './App.css'
import Start from './views/Start'

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
    <Start />
  </div>
}

export default App
