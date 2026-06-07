import { useContext } from 'react';
import FavoritesContext from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {

    const {
        favorites,
        addToFavorites,
        removeFromFavorites
    } = useContext(FavoritesContext);

    const isFavorite = favorites.some(
        fav => fav.id === movie.id
    );

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    return (
        <div className="w-[260px] m-4 bg-slate-900 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">


            <Link to={`/movie/${movie.id}`}>
                <img
                    className="w-full h-[350px] object-cover block"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            </Link>
            

            <div className="flex justify-between items-center p-3 text-white">

                <div className="h-8"></div>

                <Link
                    to={`/movie/${movie.id}`}
                    className="text-white no-underline transition-colors duration-300 hover:text-[hsl(195,41%,45%)]"
                >
                    <h3 className="font-semibold text-lg">
                        {movie.title}
                    </h3>
                </Link>

                <button
                    className="bg-transparent border-0 text-3xl cursor-pointer"
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

            </div>

        </div>
    );
}

export default MovieCard;