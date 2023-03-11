import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home'
import List from './pages/List'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  )
}

export default App
