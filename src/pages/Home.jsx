import { useState, useEffect } from 'react'
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from '../services/api';
import '../css/App.css'
import LoadingSpinner from '../components/LoadingSpinner';

function Home(){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearhQuery] = useState("");
    const [visibleMovies, setVisibleMovies] = useState(12);

    const loadMovies = async () => {
            try {
                setError(null);
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

    useEffect(() => {
        (async () =>{
            loadMovies();
        })();
    }, []);
        
    if(loading) {
        return <LoadingSpinner />
    }
    
        if(error){
            return(
                <div className="error-container">
                    <h2>⚠️ Something went wrong</h2>
                    <p>{error}</p>
                </div>
            );
        }

        if(!loading && movies.length === 0){
            return(
                <div className="empty-state">
                    <h2>🎬 No movies found</h2>
                    <p>Try searching for another movie.</p>
                <button
                    className="load-more-btn"
                    onClick={loadMovies}>
                        Back to Popular Movies
                </button>    
                </div>
            );
        }

        const handleSearch = async (e) => {
            e.preventDefault();

            if(!searchQuery.trim()) return;

            try{
                setLoading(true);
                const results = await searchMovies(searchQuery);

                setMovies(results || []);
                setVisibleMovies(12);
            }
            catch(error){
                console.error(error);
                setError("Failed to search movies");
            }
            finally{
                setLoading(false);
            }
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
                    {movies.slice(0, visibleMovies).map((movie) => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie}/>
                    ))}
                </div>
                {visibleMovies < movies.length && (
                <button
                    className="load-more-btn"
                    onClick={() => setVisibleMovies(prev => prev + 12)}
                >
                    Load More
                </button>
                )}
            </div>
        );
    };

export default Home;