import { useContext } from 'react';
import FavoritesContext from '../contexts/FavoritesContext';
import "../css/MovieCard.css"
import { Link } from 'react-router-dom';

function MovieCard({movie}){

    const {
        favorites,
        addToFavorites,
        removeFromFavorites
    } = useContext(FavoritesContext);

    const isFavorite = favorites.some(
        fav => fav.id === movie.id
    );

    const handleFavoriteClick = () => {
        if(isFavorite){
            removeFromFavorites(movie.id);
        }
        else{
            addToFavorites(movie);
        }
    };

    return(
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                />
            </Link>

            <div className="movie-info">

                <Link to={`/movie/${movie.id}`}>
                    <h3>{movie.title}</h3>
                </Link>

                <button 
                    className="favorite-btn"
                    onClick = { handleFavoriteClick }
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

            </div>
        </div>
    );
};
export default MovieCard;