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
  return <div className="App">Вот тут будет жить ваше приложение :)
    <Routes>
      <Route path='/' element={<div>MAIN</div>}/>
      <Route path='/signup' element={<div>SIGN UP</div>}/>
      <Route path='/signin' element={<div>SIGN IN</div>}/>
      <Route path='/game' element={<div>GAME</div>}/>
      <Route path='/settings' element={<div>SETTINGS</div>}/>
      <Route path='/rating' element={<div>RATING</div>}/>
      <Route path='/forum/*' element={<div>FORUM</div>}/>
      <Route path='*' element={<div>Страница не найдена</div>}/>
    </Routes>
  </div>
}

export default App
