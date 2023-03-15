import React from 'react'
const Register = ({ setUsername, setEmail, setPassword, username, email, password, handleSubmit }) => {

    return (
        <div>
            <h1 className='text-3xl my-5'>Register</h1>
            <form className='flex flex-col my-5 gap-5 items-center justify-center mx-auto' onSubmit={handleSubmit}>
                <label htmlFor="username">Username
                    <input type="text" name="username" className='ml-3 py-2 px-4 ' id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                </label>
                
                <label htmlFor="email">User Email
                    <input type="email" name="email" className='ml-3 py-2 px-4 ' id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">Password
                    <input type="password" name="password" className='ml-3 py-2 px-4 ' id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit" className='bg-orange-500/80 px-3 mx-auto py-2 rounded-sm'>Register</button>
            </form>
        </div>
    )
}

export default Register