import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';


const base_url = "https://image.tmdb.org/t/p/w500/";
const API_KEY = process.env.REACT_APP_API_KEY;

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("");
    const[selectedMovie, setSelectedMovie] = useState(null);


    useEffect  (() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results );
            return request;
    } 
     fetchData();
    }, [fetchUrl]);

  


    const opts = {
        height: "390",
        width: "100%",
    };

    const handleClick = async (movie) => {
        if (selectedMovie?.id === movie.id) {
            setSelectedMovie(null);
            setTrailerUrl('');
        } else {
            setSelectedMovie(movie);
            try {
                let type = movie.media_type || (movie.first_air_date ? "tv" : "movie");
                const res = await axios.get(`https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}`);
                const video = res.data.results.find((v) => v.type === "Trailer") || res.data.results[0];
                setTrailerUrl(video?.key || "");
            } catch (error) {
                console.log(error);
            }
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
            
            {trailerUrl && (
                <div className="row__videoContainer">
                    <iframe
                    
                        height="450px"
                        width="100%" 
                        src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1`}
                        aspectRatio="16:9"
                        frameBorder="0"
                        allowFullScreen
                        title="Movie Trailer"
                        
                    />
                </div>
            )}
        
        </div>
     )
    
}

export default Row