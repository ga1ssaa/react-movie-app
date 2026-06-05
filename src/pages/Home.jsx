import { useState, useEffect } from 'react'
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from '../services/api';
import '../css/App.css'

function Home(){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearhQuery] = useState("");
    
    useEffect(() => {

        const loadMovies = async () => {
            try {
                setLoading(true);
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies || []);
            }
            catch(error) {
                setError("Failed to load movies");
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, []);

    if(loading) {
        return <h2>Loading...</h2>;
    }
    
    if(error){
        return <h2>{error}</h2>;
    }

    if(!loading && movies.length === 0){
        return <h2>No movies found</h2>
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        if(!searchQuery.trim()) return;
        
        const results = await searchMovies(searchQuery);

        setMovies(results);
    }

    return(
        <div className="home">

            <h1>Movie Catalog</h1>

            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearhQuery(e.target.value)}
                />
            </form>

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie}/>
                ))}
            </div>
        </div>
    );
};

export default Home;