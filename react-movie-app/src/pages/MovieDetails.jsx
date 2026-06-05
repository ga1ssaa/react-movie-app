import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../services/api';
import MovieCard from '../components/MovieCard.jsx'
import '../css/MovieDetails.css' 

function MovieDetails(){

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadMovie = async () => {
            try{
                const data = await getMovieDetails(id);
                setMovie(data);
                const similar = await getSimilarMovies(id);
                setSimilarMovies(similar);
            }
            catch(error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if(loading){
        return <h2>Loading...</h2>
    }

    if(!movie){
        return <h2>Movie not found</h2>
    }

    return( 
        <div
            className="movie-page"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}
        >
            <div className="movie-overlay">

                <div className="movie-details">

                    <img
                        className="movie-details-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div className="movie-details-info">

                        <h1>{movie.title}</h1>

                        <p>
                            ⭐ Rating: {movie.vote_average.toFixed(1)} / 10
                        </p>

                        <p>
                            📅 Release Date: {movie.release_date}
                        </p>

                        <p>
                            {movie.overview}
                        </p>

                        <p>
                            🎭 Genres:
                            {movie.genres
                                .map(genre => genre.name)
                                .join(", ")}
                        </p>

                    </div>
                </div>

                <div className = "similar-movies">
                    <h2>You May Also Like</h2>
                <div className = "movie-grid">
                    {similarMovies.slice(0, 12).map(movie => (
                        <MovieCard 
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
};
export default MovieDetails;