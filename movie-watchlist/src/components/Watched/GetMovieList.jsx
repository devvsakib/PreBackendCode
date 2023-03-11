import { useState, useEffect } from 'react';
import axios from 'axios';
const GetMovieList = () => {
    const [watched, setWatched] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [done, setDone] = useState(false);
    const [update, setUpdate] = useState('');
    console.log(update);
    useEffect(() => {
        fetch('http://localhost:5000/watched')
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setWatched(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [done]);
    useEffect(() => {
        fetch('http://localhost:5000/watchlist')
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setWatchlist(data);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [watched, done]);

    const deleteAction = (e) => {
        try {
            axios.delete(`http://localhost:5000/${e.target.value}`)
                .catch(err => console.log(err));
            //  hide the card
            e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const updateAction = () => {
            try {
                axios.patch(`http://localhost:5000/update`, { name: update })
                    .catch(err => console.log(err));
                    setDone(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        updateAction();
    }, [done]);
    

    return { watched, watchlist, setDone, setUpdate, deleteAction };
}

export default GetMovieList;