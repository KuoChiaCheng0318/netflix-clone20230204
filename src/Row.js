import movieTrailer from 'movie-trailer';
import React, {useEffect, useState} from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css"

const base_url="https://image.tmdb.org/t/p/original/"

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // "https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213"
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        };
        fetchData();
    }, [fetchUrl])

    console.log(movies);

    const opts= {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1,
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl('');
        } else{
            // movieTrailer(movie?.name || "")
            // console.log(movie?.title);
            movieTrailer( movie?.title  || movie?.name )
            .then((url) => {
                // console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search);
                // console.log(urlParams);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error))
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row