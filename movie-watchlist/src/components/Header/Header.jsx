import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="navbar bg-base-100 grid justify-center items-center sm:grid-cols-2 px-5 sm:px-0">

            <div>
                <h2 className='text-xl font-bold font-mono  rounded '>KDRAMA Watch</h2>
            </div>
            <div className="flex-none gap-2 ml-auto">
                <div>
                    <Link to={'/'} className="btn btn-ghost normal-case text-xl">Home</Link>
                </div>
                <div className='btn btn-ghost normal-case text-xl'>
                    <Link to="list">
                        List
                    </Link>

                </div>
                {/* <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered" />
                </div> */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="assets/favicon.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Login</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header