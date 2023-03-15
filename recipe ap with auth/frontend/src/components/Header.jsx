import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const [cookie, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();

    const logOut = () => {
        setCookie("access_token", "")
        window.localStorage.removeItem("userId")
        window.localStorage.removeItem("username")
        navigate("/auth")
    }
    return (
        <header className='flex items-center gap-5 py-4 bg-white/10 px-5'>
            <div>
                <Link to={'/'}>
                    <h2 className='font-bold text-3xl font-[raleway]'>Recipe</h2>
                </Link>
            </div>
            <nav>
                <ul className='flex gap-5'>
                    <li><Link to={'/'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Home</Link></li>
                    <li><Link to={'/saved-recipes'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Saved Recipes</Link></li>
                    {
                        !cookie.access_token ?
                            <li><Link to={'/auth'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Login</Link></li>
                            :
                            <>
                                <li><Link to={'/create-recipe'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Create Recipe</Link></li>
                                <li><Link to={'/auth'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg" onClick={logOut}>Logout</Link></li>
                            </>
                    }
                </ul>
            </nav>
            {/* <div>
                <h3>{user ? user : "Anonymous"}</h3>
            </div> */}
        </header>
    )
}

export default Header