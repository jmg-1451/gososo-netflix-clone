import React, { useState, useEffect, useRef } from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");
    const scrollRef = useRef(null);

    useEffect  (() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results );
            return request;
    } 
     fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        }
    };


    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {

                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
            })
            
                .catch((error) => console.log(error));
        }

    };
    
    const handleWheel = (e) => {
        if (e.deltaY !== 0) {
            e.currentTarget.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    };

    console.table(movies);

    return (
        <div className = "row">
            <h2>{title}</h2>

        <div className="row__posters">
            

            {movies.map(movie => (
                <img 
                    key={movie.id}
                    onClick={() => handleClick (movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.poster_path}`}
                    alt={movie.name}
                />
            ))}
            </div>
            
           {trailerUrl && <YouTube videoID={trailerUrl} opts={opts} />}
        
        </div>
     )
    
}

export default Row