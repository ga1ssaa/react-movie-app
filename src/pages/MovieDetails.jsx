import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies, getMovieTrailer } from '../services/api';
import MovieCard from '../components/MovieCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx';

function MovieDetails(){

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadMovie = async () => {
            try{
                const data = await getMovieDetails(id);
                setMovie(data);
                const similar = await getSimilarMovies(id);
                setSimilarMovies(similar);
                const trailer = await getMovieTrailer(id);
                setTrailer(trailer);
            }
            catch(error){
                console.error(error);
                setError("Failed to load movie data");
            }
            finally{
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if(loading){
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

    if(!movie){
        return <h2>Movie not found</h2>
    }

return (
    <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
        }}
    >
        <div className="min-h-screen bg-black/70 backdrop-blur-sm">

            <div className="w-full centermax-w-7xl mx-auto px-16 py-16">
                <div className="h-10"></div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 text-white max-w-6xl mx-auto w-full">
                    <img
                        className="w-[300px] rounded-2xl shadow-2xl"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />

                <div className="flex-1 max-w-[600px] text-center lg:ml-10">

                        <h1 className="text-[hsl(195,41%,45%)] text-5xl font-bold mb-6 break-words">
                            {movie.title}
                        </h1>
                        <div className="h-2"></div>

                        <p className="text-xl font-bold mb-4">
                            ⭐ Rating: {movie.vote_average.toFixed(1)} / 10
                        </p>
                        <div className="h-2"></div>

                        <p className="text-xl font-bold mb-4">
                            📅 Release Date: {movie.release_date}
                        </p>
                        <div className="h-2"></div>

                        <p className="text-lg leading-8 mb-8 font-bold">
                            🍀 {movie.overview}
                        </p>
                        <div className="h-2"></div>

                        <div className="border-t border-white/20 pt-6 space-y-4 font-bold">

                            <p>
                                🎭 Genres: {movie.genres
                                    .map(genre => genre.name)
                                    .join(", ")}
                            </p>
                            <div className="h-2"></div>

                            <p>
                                ⚡️ Runtime: {movie.runtime} min
                            </p>
                            <div className="h-2"></div>

                            <p>
                                🌎 Original Language: {movie.original_language.toUpperCase()}
                            </p>
                            <div className="h-2"></div>

                            <p>
                                👥 Votes: {movie.vote_count}
                            </p>
                            <div className="h-2"></div>

                            <p>
                                🎬 Production: {movie.production_companies
                                    .slice(0, 3)
                                    .map(company => company.name)
                                    .join(", ")}
                            </p>
                            <div className="h-2"></div>

                        </div>

                    </div>

                </div>
                <div className="h-10"></div>
                {trailer && (
                    <div className="mt-24 flex flex-col items-center">

                        <h2 className="text-[hsl(195,41%,45%)] text-5xl mb-10 text-center font-bold">
                            🎬 Official Trailer
                        </h2>
                        <div className="h-5"></div>

                        <iframe
                            className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="Movie Trailer"
                            allowFullScreen
                        />

                    </div>
                )}

                <div className="h-10"></div>
                <div className="mt-24 flex flex-col items-center">

                    <h2 className="text-[hsl(195,41%,45%)] text-5xl text-center mb-12 font-bold">
                        You May Also Like
                    </h2>
                    <div className="h-5"></div>

                    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">

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
    </div>
);
};
export default MovieDetails;