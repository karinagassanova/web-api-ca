export const getMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/discover`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

  
export const getMovie = (args) => {
  console.log(args)
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

  
export const getGenres = () => {
  return fetch(
    "http://localhost:8080/api/movies/genres"
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};
  
export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/images`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/reviews`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

  export const getUpcomingMovies = async (page = 1) => {
    const response = await fetch(
      `http://localhost:8080/api/movies/upcoming?page=${page}`
    );
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.status_message || error.msg || response.statusText || "Failed to fetch upcoming movies");
    }
    return await response.json();
  };

  // https://developer.themoviedb.org/reference/configuration-languages
  export const getLanguages = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${import.meta.env.VITE_TMDB_KEY}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch languages");
    }
    return await response.json();
  };

  // https://developer.themoviedb.org/reference/movie-popular-list
  export const getPopularMovies = async (page = 1) => {
    const response = await fetch(
      `http://localhost:8080/api/movies/popular?page=${page}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch popular movies");
    }
    return await response.json();
  };
  
  // https://developer.themoviedb.org/reference/movie-top-rated-list
  export const getTopRatedMovies = async (page = 1) => {
    const response = await fetch(
      `http://localhost:8080/api/movies/top-rated?page=${page}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch top rated movies");
    }
    return await response.json();
  };
  
  // https://developer.themoviedb.org/reference/movie-now-playing-list
  export const getNowPlayingMovies = async (page = 1) => {
    const response = await fetch(
      `http://localhost:8080/api/movies/now-playing?page=${page}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch now playing movies");
    }
    return await response.json();
  };

  
  // https://developer.themoviedb.org/reference/movie-recommendations
  export const getMovieRecommendations = async (movieId) => {
    const response = await fetch(
      `http://localhost:8080/api/movies/${movieId}/recommendations`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch movie recommendations");
    }
    return await response.json();
  };

// https://developer.themoviedb.org/reference/movie-credits
export const getMovieCredits = async (movieId) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/${movieId}/credits`
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.status_message || "Failed to fetch movie cast");
  }
  return response.json();
};

// 
export const getActorDetails = async (actorId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch actor details");
  }
  return response.json();
};

export const getActorMovies = async (actorId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch actor movies");
  }
  return response.json();
};

export const login = async (username, password) => {
  const response = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Login failed");
  }

  return data;
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};
