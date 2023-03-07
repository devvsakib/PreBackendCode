import { useState, useEffect } from 'react'
import MovieCard from '../components/Card/MovieCard'
import Search from '../components/Search/Search'

const Home = () => {
    const [dramas, setDramas] = useState([])
    const [loading, setLoading] = useState(true)
    const [addDrama, setAddDrama] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [dramaById, setDramaById] = useState([])
    const [searchValueId, setSearchValueId] = useState('')


    // searchValue ? searchValueId('') : searchValueId(searchValue)
    useEffect(() => {
        setSearchValueId('')
    }, [searchValue])

    const searchDrama = () => {
        setLoading(true)
        const apiUrl = `https://mydramalist-scrape-api.vercel.app/search/q/${searchValue === '' ? 'goblin' : searchValue}`
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setDramas(data.results.dramas)
                setLoading(false)

            })
        setDramas([])
    }

    useEffect(() => {
        searchDrama()
    }, [searchValue])

    const addDramas = () => {
        setAddDrama([...addDrama, dramas])
        localStorage.setItem('drama', JSON.stringify(addDrama))

    }

    const searchById = () => {
        fetch(`http://localhost:5000/${searchValueId}`)
            .then(res => res.json())
            .then(data => {
                setDramaById(data)
            })
    }
    return (
        <div className=''>
            <Search
                value={searchValue}
                setSearchValue={setSearchValue}
                searchDrama={searchDrama}
                searchById={searchById}
                setSearchValueId={setSearchValueId}
                searchValueId={searchValueId}
            />
            <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    loading ? <div className='mx-auto translate-x-20 md:translate-x-[100%]'>
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif" alt="Loading Gif" className='w-1/4' />
                    </div> : (dramas && !searchValueId ? dramas.map((drama, idx) => (
                        drama.title !== undefined ?
                            <MovieCard
                                drama={drama}
                                key={idx}
                                setDramas={setDramas}
                                addDrama={addDramas}
                            /> : "No Drama"
                    )) : dramaById && searchValueId ? <h2>{dramaById.name}</h2> : "No Drama")
                }
            </div>
        </div>
    )
}

export default Home