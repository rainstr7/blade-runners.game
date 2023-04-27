import { useEffect } from 'react'
import './App.scss'
import Auth from './views/Auth'
import Layout from './components/HOC/Layout'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, []);

  return (
    <Layout>
      <Auth />
    </Layout>);
}

export default App
