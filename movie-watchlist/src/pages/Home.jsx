import { useState, useEffect } from 'react'
import MovieCard from '../components/Card/MovieCard'
import Search from '../components/Search/Search'
import axios from 'axios'

const Home = () => {
    const apiUrl = "https://mydramalist-scrape-api.vercel.app/search/q/true-beauty"
    const [dramas, setDramas] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        axios.get(apiUrl)
            .then(data => {
                setDramas(data.data.results.dramas)
            })
    }, [])


    return (
        <div className=''>
            <Search
                value={searchValue}
                setSearchValue={setSearchValue}
            />
            <div className='grid gap-8 grid-cols-1 md:grid-cols-3'>
                {
                    dramas.map((drama, idx) => (
                        <MovieCard
                            drama={drama}
                            key={idx}
                        />
                ))
                }
            </div>
        </div>
    )
}

export default Home