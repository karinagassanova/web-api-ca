import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserMovies, addFavorite, removeFavorite, addMustWatch, removeMustWatch } from "../api/userMovies-api";
import { AuthContext } from "./authContext";

export const MoviesContext = createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  // Get authentication status from AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovies = async () => {
      // Clear favorites when user logs out
      if (!isAuthenticated) {
        setFavorites([]);
        setMustWatch([]);
        setMyReviews({});
        return;
      }

      try {
        const data = await getUserMovies();
        setFavorites(data.favorites || []);
        setMustWatch(data.mustWatch || []);
      } catch (err) {
        console.error("Failed to fetch user movies:", err);
        if (!localStorage.getItem("token")) {
          setFavorites([]);
          setMustWatch([]);
        }
      }
    };
    fetchMovies();
  // Refetch favorites when authentication status changes (login/logout)
  }, [isAuthenticated]);

  const addToFavorites = async (movie) => {
    try {
      const updated = await addFavorite(movie.id);
      setFavorites(updated);
    } catch (err) {
      console.error("Failed to add favorite:", err);
      alert(`Failed to add favorite: ${err.message}`);
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      const updated = await removeFavorite(movie.id);
      setFavorites(updated);
    } catch (err) {
      console.error("Failed to remove favorite:", err);
      alert("Failed to remove favorite. Please try again.");
    }
  };

  const addToMustWatch = async (movie) => {
    try {
      const updated = await addMustWatch(movie.id);
      setMustWatch(updated);
    } catch (err) {
      console.error("Failed to add to must watch:", err);
      alert("Failed to add to must watch. Please try again.");
    }
  };

  const removeFromMustWatch = async (movie) => {
    try {
      const updated = await removeMustWatch(movie.id);
      setMustWatch(updated);
    } catch (err) {
      console.error("Failed to remove from must watch:", err);
      alert("Failed to remove from must watch. Please try again.");
    }
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider value={{
      favorites,
      mustWatch,
      myReviews,
      addToFavorites,
      removeFromFavorites,
      addToMustWatch,
      removeFromMustWatch,
      addReview
    }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
