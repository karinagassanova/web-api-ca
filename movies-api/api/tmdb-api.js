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

  // Get movie images
export const getMovieImages = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch movie images');
    }
  
    return await response.json();
  };
  
  // Get movie reviews
  export const getMovieReviews = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch movie reviews');
    }
  
    return await response.json();
  };
  
  // Get movie credits (cast & crew)
  export const getMovieCredits = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch movie credits');
    }
  
    return await response.json();
  };

  // Get popular movies
export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch popular movies');
    }
  
    return await response.json();
  };
  
  // Get top rated movies
  export const getTopRatedMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch top rated movies');
    }
  
    return await response.json();
  };
  
  // Get now playing movies
  export const getNowPlayingMovies = async (page = 1) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch now playing movies');
    }
  
    return await response.json();
  };
  
  // Get movie recommendations
  export const getMovieRecommendations = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch movie recommendations');
    }
  
    return await response.json();
  };

  // Get actor details
export const getActorDetails = async (actorId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch actor details');
    }
  
    return await response.json();
  };
  
  // Get actor movies
  export const getActorMovies = async (actorId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch actor movies');
    }
  
    return await response.json();
  };

  // Get available languages
export const getLanguages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}`
    );
  
    if (!response.ok) {
      throw new Error((await response.json()).status_message || 'Failed to fetch languages');
    }
  
    return await response.json();
  };