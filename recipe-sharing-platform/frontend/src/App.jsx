import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/pages/Home'
import List from './components/pages/List'
import Details from './components/pages/Details'
import Header from './components/Header/Header'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Dashboard from './components/pages/Dashboard'
import UserDetails from './components/UserDetails'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="App">
      <Header setIsAuthenticated={setIsAuthenticated} />
      {isAuthenticated ? <UserDetails /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
