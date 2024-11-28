import { useQuery } from '@tanstack/react-query';
import { MovieDetails } from '~/types';
import { useParams } from 'react-router';

const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,

        },
    };

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);

    if (!response.ok) {
        throw new Error('Failed to fetch movie details');
    }

    return response.json();
};

const MovieDetail = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useQuery<MovieDetails, Error>(
        {
            queryKey: ['movieDetail', id],
            queryFn: () => fetchMovieDetails(id!)
        }
    );

    if (!data) return <p className='text-center text-white'> Uh oh 😢.... I cannot find your data.</p>
    if (isLoading) return <p className="text-center text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    const {
        title,
        backdrop_path,
        overview,
        genres,
        release_date,
        vote_average,
        poster_path,
        runtime,
        tagline,
    } = data;

    return (
        <div className="bg-black min-h-screen text-white font-sans">
            <div
                className="relative w-full h-[60vh] bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-90 flex items-end">
                    <div className="container mx-auto px-6 pb-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-md">{title}</h1>
                        <p className="mt-4 text-lg italic opacity-75">{tagline}</p>
                        <div className="flex flex-wrap mt-4 space-x-4">
                            <p className="text-sm font-semibold bg-red-600 px-3 py-1 rounded-md">Rating: {vote_average}/10</p>
                            <p className="text-sm">{release_date}</p>
                            <p className="text-sm">{runtime} min</p>
                            <p className="text-sm">{genres.map((g) => g.name).join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={title}
                            className="rounded-lg shadow-lg border-4 border-gray-800"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold mb-4">Overview</h2>
                        <p className="text-gray-300 text-lg leading-relaxed">{overview}</p>

                        <div className="mt-8">
                            <h3 className="text-2xl font-bold mb-2">Details</h3>
                            <ul className="space-y-2">
                                <li>
                                    <strong>Status:</strong> Released
                                </li>
                                <li>
                                    <strong>Runtime:</strong> {runtime} minutes
                                </li>
                                <li>
                                    <strong>Genres:</strong> {genres.map((genre) => genre.name).join(', ')}
                                </li>
                                <li>
                                    <strong>Release Date:</strong> {release_date}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
