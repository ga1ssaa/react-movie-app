import { useContext } from 'react';
import FavoritesContext from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard';


function Favorites(){

    const { favorites } = useContext(FavoritesContext);

    if(favorites.length === 0){
        return(
            <h2>No favorite movies yet</h2>
        );
    }

    return(
        <div className = "home">
            <h1>Favorites Page</h1>

            <div className = "movies-grid">
                {favorites.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie} 
                    />
                ))}
            </div>
        </div>
    );
};
export default Favorites;