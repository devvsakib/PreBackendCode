import { useState, useEffect } from 'react'
import MovieCard from '../components/Card/MovieCard'
import Search from '../components/Search/Search'
import axios from 'axios'

const Home = () => {
    const [dramas, setDramas] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const apiUrl = `https://mydramalist-scrape-api.vercel.app/search/q/${searchValue}`

    const searchDrama = () => {
        console.log(searchValue);
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setDramas(data.results.dramas)
            })
            setDramas([])
    }


    return (
        <div className=''>
            <Search
                value={searchValue}
                setSearchValue={setSearchValue}
                searchDrama={searchDrama}
            />
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    dramas.map((drama, idx) => (
                        drama.title !== undefined ?
                            <MovieCard
                                drama={drama}
                                key={idx}
                                setDramas={setDramas}
                            /> : "No Drama"
                    ))
                }
            </div>
        </div>
    )
}

export default Home