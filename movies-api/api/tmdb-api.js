import fetch from 'node-fetch';

// Discover movies (homepage)
export const getMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  );

  if (!response.ok) {
    throw new Error((await response.json()).status_message || 'Failed to fetch discover movies');
  }

  return await response.json();
};

// Upcoming movies
export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error((await response.json()).status_message || 'Failed to fetch upcoming movies');
  }

  return await response.json();
};

// Get single movie details
export const getMovie = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch movie details');
    }
  
    return await response.json();
  };

  // Get movie genres
export const getGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch genres');
    }
  
    return await response.json();
  };