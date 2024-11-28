import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MovieList, Result } from '~/types';
import { useNavigate } from 'react-router';

const fetchMovieLists = async ({ pageParam = 1 }: { pageParam?: number }): Promise<MovieList> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageParam}&sort_by=popularity.desc`,
    options
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

const MoviesList: React.FC = () => {

  const navigate = useNavigate();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    {
      queryKey: ['movieLists'],
      queryFn: fetchMovieLists,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
      },

    }
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data?.pages.map((page) =>
            page.results.map((movie: Result) => (
              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-opacity">
                  <h3 className="text-lg font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-300">{movie.release_date}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {isFetchingNextPage && <p className="text-center mt-4">Loading more...</p>}
        {!hasNextPage && <p className="text-center mt-4">No more movies!</p>}
      </div>
    </div>
  );
};

export default MoviesList;
