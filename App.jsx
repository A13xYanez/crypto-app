import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import './App.css'

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function getData(username, password) {
    setUsername(username)
    setPassword(password)
  }
    
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login onSubmit={getData} />} exact />
          <Route path='/register' element={<Register onSubmit={getData} />} />
          <Route path='/home' element={<Home username={username} password={password} />} />
        </Routes>
    </Router>
  )
}

export default App
