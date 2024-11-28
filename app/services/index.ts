import { MovieDetails, MovieList } from '~/types';

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  );

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return response.json();
};

export const fetchMovieLists = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}): Promise<MovieList> => {
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
