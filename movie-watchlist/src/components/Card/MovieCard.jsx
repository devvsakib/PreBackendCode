import { useState } from "react"

const MovieCard = ({ drama }) => {
    const [showCast, setShowCast] = useState(true)
    return (
        <div className="card flex-col  shadow-lg card-side  p-0 overflow-hidden bg-base-100">
            <div className="flex flex-col md:flex-row">
                <img className='w-1/2 h-full' src={`https://mydramalist.com${drama?.poster}`} alt="Movie" />
                {/* <img className='md:w-1/2 md:h-full' src={`${drama.thumb}`} alt="Movie" /> */}
                <div className="card-body justify-between py-3 text-left pl-5 md:pl-3 pr-2">
                    <div>
                        <h2 className="card-title mb-2">{drama?.title}</h2>
                        {/* <p>{drama?.synopsis}</p> */}
                        <p><b>Type: </b>{drama.details?.type}</p>
                        <p><b>Rating: </b>{drama.rating}</p>
                        <p><b>Episodes: </b>{drama.details?.episodes}</p>
                        <p><b>Ranked: </b>{drama.details?.ranked}</p>
                        <div>
                            {
                                drama.others?.genres.map(genre => (
                                    <span>{genre},<br /></span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="card-actions justify-start">
                        <button className="px-3 py-2 rounded-md btn-primary">
                            {/* <a href={`https://mydramalist.com/${drama.slug}`} target="_blank">Watch</a> */}
                            <a href={drama?.link} target="_blank">Watch</a>
                        </button>
                        <button className="px-3 py-2 rounded-md btn-primary">Add</button>
                    </div>
                </div>
            </div>
            <div className="text-left p-3">
                <button className=" my-2 btn-primary px-4 rounded-md uppercase font-semibold"
                onClick={()=> setShowCast(!showCast)}>Show Cast</button>
                <div className={`${showCast ? "hidden" : ""} flex gap-5 justify-start flex-col`}>
                    {
                        drama.casts?.map(cast => (
                            <div className="avatar flex items-center gap-3">
                                <div className="w-12 rounded-full">
                                    <img src={`https://mydramalist.com${cast.profile_image}`} />
                                </div>
                                <h2><a href={cast.link} target="_blank">{cast.name}</a></h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieCard