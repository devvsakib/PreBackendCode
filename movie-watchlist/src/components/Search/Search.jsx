import { Link } from 'react-router-dom';
const Search = ({ searchValue, setSearchValue, searchDrama, searchById, searchValueId, setSearchValueId }) => {

    const path = window.location.pathname.slice(1);

    return (
        <div className="form-control my-10">
            <div className='mx-auto'>
                <div className="input-group w-auto">
                    <input type="text" placeholder="Search Movie…" className="input input-bordered"
                        value={searchValue}
                        onKeyUp={e => setSearchValue(e.target.value)} />
                    <button className="btn btn-square" onClick={searchDrama}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
                {/* {
                    path === "list" && <div className="input-group mt-5 w-auto">
                        <input type="text" className="input input-bordered"
                            value={searchValueId}
                            placeholder="Search by id"
                            onChange={e => setSearchValueId(e.target.value)} />
                        <button className="btn btn-square" onClick={searchById}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default Search