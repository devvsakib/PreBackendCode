import GetMovieList from "../Watched/GetMovieList"

const WatchlistCard = () => {
    const { watchlist, deleteAction } = GetMovieList();
    return (
        <>
            {
                watchlist.length == 0 ? <h1 className='text-xl font-semibold mb-5'>No movies in watching list</h1> : watchlist && watchlist.map((movie, idx) => (
                    <div className="collapse rounded" key={idx}>
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title bg-[#881882]/60 peer-checked:bg-secondary peer-checked:text-secondary-content text-xl font-semibold text-white">
                            {movie?.name}
                        </div>
                        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-white/10 backdrop-blur-md peer-checked:text-secondary-content">
                            <div className="card card-side text-left shadow-xl  flex-col md:flex-row">
                                <figure><img src={movie?.thumbnail} alt="Movie" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title text-white ">{movie?.name}</h2>
                                    <p className="text-white ">{movie.description}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary" onClick={deleteAction}
                                            value={movie.name}
                                        >Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default WatchlistCard