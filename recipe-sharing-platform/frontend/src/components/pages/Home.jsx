import { useState, useEffect } from 'react';
import React from 'react'
import Gallary from '../Cards/Gallary'
import ReciepeCard from '../Cards/ReciepeCard'
import SearchInput from '../Search/SearchInput'
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    return (
        <div>
            <div className="hero h-48 mb-5 bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <SearchInput 
                            recipes={recipes}
                            setRecipes={setRecipes}
                        />
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-left text-3xl font-semibold mb-5'>Trending</h2>
                <Gallary 
                    recipes={recipes}
                    />
            </div>
            <div className='my-32'>
                <select className="select mb-10 select-warning w-full max-w-xs">
                    <option disabled selected>Category</option>
                    <option>Vegetarian</option>
                    <option>Gluten-free</option>
                    <option>Desserts</option>
                </select>
                <Gallary />

            </div>
            <div className='my-32'>
                <div className="indicator">
                    <div className="indicator-item indicator-bottom">
                        <button className="btn btn-primary">Join</button>
                    </div>
                    <div className="card border">
                        <div className="card-body">
                            <h2 className="card-title">Add your reciepe</h2>
                            <p>Rerum reiciendis beatae tenetur excepturi</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home