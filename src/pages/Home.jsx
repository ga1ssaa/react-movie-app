import { useState, useEffect } from 'react'
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from '../services/api';
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
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
            <h2 className="text-red-500 text-3xl font-bold mb-4">
                ⚠️ Something went wrong
            </h2>

            <p className="text-white text-lg">
                {error}
            </p>
        </div>
    );
}

        if(!loading && movies.length === 0){
            return(
                <div className="flex min-h-[60vh] flex-col justify-center items-center text-center">
                    <h2 className="text-white font-bold text-2xl mb-2">🎬 No movies found</h2>
                    <p className="text-white/70 font-bold">Try searching for another movie.</p>
                <button
                    className="block bg-slate-950 text-white mt-2 mx-auto mb-10 py-3 px-6 border-0 rounded-xl cursor-pointer text-base font-bold transition-all hover:text-yellow-400 hover:scale-105 duration-300"
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
            <div className="home min-h-screen pt-8">
                <div className="h-8"></div>

                <h1 className="text-3xl font-bold text-center text-white/90 mb-12">
                    Movie Catalog
                </h1>
                <div className="h-8"></div>

            <form className="flex justify-center mb-8" onSubmit={handleSearch}>
                <input
                    className="w-full max-w-xl px-4 py-3 font-bold text-center text-xl text-white bg-slate-900 rounded-lg border border-gray-600"
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearhQuery(e.target.value)}
                />
            </form>
            <div className="h-8"></div>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 p-12">
                    {movies.slice(0, visibleMovies).map((movie) => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie}/>
                    ))}
                </div>
                <div className="h-8"></div>
                <div className="flex justify-center mt-20 mb-32">
                    {visibleMovies < movies.length && (
                        <button
                            className="bg-slate-950 text-white mb-10 py-3 px-6 border-0 rounded-xl cursor-pointer text-base font-bold transition-all hover:text-yellow-400 hover:scale-105 duration-300"
                                onClick={() => setVisibleMovies(prev => prev + 12)}
                            >
                                Load More
                        </button>
                    )}
                </div>
                <div className="h-8">
                </div>
            </div>
        );
    };

export default Home;