import React, { createContext, useState, useEffect, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getUserMovies,
  addFavorite,
  removeFavorite,
  addMustWatch,
  removeMustWatch,
} from "../api/userMovies-api";
import {
  getMyReviews,
  createReview as apiCreateReview,
} from "../api/reviews-api";
import { AuthContext } from "./authContext";

export const MoviesContext = createContext(null);

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [myReviewsByMovie, setMyReviewsByMovie] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchMovies = async () => {
      // Clear state when user logs out
      if (!isAuthenticated) {
        setFavorites([]);
        setMustWatch([]);
        setMyReviewsByMovie({});
        return;
      }

      try {
        const data = await getUserMovies();
        setFavorites(data.favorites || []);
        setMustWatch(data.mustWatch || []);

        const reviews = await getMyReviews();
        const grouped = reviews.reduce((acc, review) => {
          acc[review.movieId] = review;
          return acc;
        }, {});
        setMyReviewsByMovie(grouped);
      } catch (err) {
        console.error("Failed to fetch user movies:", err);
        if (!localStorage.getItem("token")) {
          setFavorites([]);
          setMustWatch([]);
          setMyReviewsByMovie({});
        }
      }
    };
    fetchMovies();
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

  const addReview = async (movie, review) => {
    try {
      const created = await apiCreateReview({
        movieId: movie.id,
        rating: review.rating,
        content: review.review || review.content,
      });
      setMyReviewsByMovie({ ...myReviewsByMovie, [movie.id]: created });
      // Refresh My Reviews page data so the new review appears immediately
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    } catch (err) {
      console.error("Failed to create review:", err);
      alert("Failed to submit review. Please make sure you are logged in.");
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        myReviews: myReviewsByMovie,
        addToFavorites,
        removeFromFavorites,
        addToMustWatch,
        removeFromMustWatch,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;


