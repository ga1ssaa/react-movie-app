import { useContext } from 'react';
import FavoritesContext from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard';

function Favorites() {

    const { favorites } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2 className="text-white text-3xl font-bold">
                    No favorite movies yet ❤️
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-12 px-8">
            <div className="h-8"></div>

            <h1 className="text-3xl font-bold text-center text-white mb-16">
                Favorites Movies
            </h1>
            <div className="h-8"></div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>

        </div>
    );
}

export default Favorites;