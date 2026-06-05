import { useState, useEffect } from 'react';
import FavoritesContext from './FavoritesContext';

export function FavoritesProvider({children}){

    const [favorites, setFavorites] = useState (()=>{
        const savedFavorites = 
            localStorage.getItem("Favorites");
        
        return savedFavorites 
            ? JSON.parse(savedFavorites)
            : [];
    });

    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie]);
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(
            favorites.filter(movie => movie.id !== movieId)
        );
    };

    useEffect(() => {
        localStorage.setItem(
            "Favorites",
            JSON.stringify(favorites)
        );
    }, [favorites])
    
    return(
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}