
import WatchedCard from '../components/Watched/WatchedCard'
import WatchlistCard from '../components/Watchlist/WatchlistCard'

const List = () => {


    return (
        <div className=''>
            <div className='grid mt-10 gap-20 justify-between md:grid-cols-2'>
                <div>

                    <h1 className='text-xl font-semibold mb-5'>Watched</h1>
                    <div className='grid gap-5'>
                        <WatchedCard />
                    </div>
                </div>
                <div>
                    <h1 className='text-xl font-semibold mb-5'>Watchlist</h1>
                    <div className='grid gap-5'>
                       <WatchlistCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List