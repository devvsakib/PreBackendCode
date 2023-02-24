import { useState, useEffect } from 'react'
import MovieCard from '../components/Card/MovieCard'
import Search from '../components/Search/Search'
import axios from 'axios'

const Home = () => {
    const apiUrl = "https://mydramalist-scrape-api.vercel.app/search/q/kiss-sixth-sense"
    const [dramas, setDramas] = useState([])
    const [singleDrama, setSingleDrama] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        axios.get(apiUrl)
            .then(data => {
                setDramas(data.data.results.dramas)
            })
    }, [])

    useEffect(() => {
        for (const e of dramas) {
            console.log(e.slug);
            const api = `https://mydramalist-scrape-api.vercel.app/id/${e.slug}`
            axios.get(api)
                .then(data => {
                    setSingleDrama(data.data.data)
                })
        }
    }, [dramas])
    console.log(singleDrama);
    return (
        <div className=''>
            <Search
                value={searchValue}
                setSearchValue={setSearchValue}
            />
            <div className='grid gap-8 grid-cols-1 md:grid-cols-3'>
                <MovieCard
                    drama={singleDrama}
                />
            </div>
        </div>
    )
}

export default Home