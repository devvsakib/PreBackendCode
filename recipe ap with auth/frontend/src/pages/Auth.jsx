import React, { useState } from 'react'
import axios from 'axios'
import Login from '../components/Login'
import Register from '../components/Register'
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [_, setCookies] = useCookies(["access_token"])


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", { username, password, email })
      alert("Registrations Success! Please login")
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", { username, password })
      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userId", response.data.userId)
      window.localStorage.setItem("username", response.data.username)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 items-center'>
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <h2 className='text-xl font-semibold'>:</h2>
          <Register
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            email={email}
            setEmail={setEmail}
            handleSubmit={handleSubmit}
          />
    </div>
  )
}

export default Auth