import React, {useState, useEffect} from 'react'
import axios from './axios'
import requests from './requests'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect (() => {
        async function fetchData(){
            const request = await axios.get(requests.fetchTrending)
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length -1)]);
            // console.log(request.data.results[
            //     Math.floor(Math.random() * request.data.results.length -1)]);
        }
        fetchData()
    }, [])

    console.log(movie)

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            }}
        >
            <div className='banner__contents'>
                <h1>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
            </div>

        </header>
    )
}

export default Banner