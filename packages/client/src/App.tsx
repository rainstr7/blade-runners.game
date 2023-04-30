import { useEffect } from 'react'
import './App.css'
import SignUp from './views/SignUp'

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

  return <SignUp />
}

export default App
