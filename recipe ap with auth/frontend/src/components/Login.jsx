import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ setUsername, setPassword, username, password, handleLogin }) => {
    return (
        <div>
            <h1 className='text-3xl my-5'>Login</h1>
            <form className='flex flex-col my-5 gap-5' 
            onSubmit={handleLogin}
            >
                <label htmlFor="username">Username
                    <input type="text" name="username" className='ml-3 py-2 px-4 ' id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                </label>
                <label htmlFor="password">Password
                    <input type="password" name="password" className='ml-3 py-2 px-4 ' id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </label>
                <button  type="submit" className='bg-orange-500/80 px-4 mx-auto py-2 rounded-sm'>Login</button>
            </form>
        </div>
    )
}

export default Login