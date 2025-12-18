import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ProfilePage from "./pages/profilePage";
import MyReviewsPage from "./pages/myReviewsPage";
import StartPage from "./pages/startPage";

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AuthContextProvider, { AuthContext } from "./contexts/authContext"; 
import ProtectedRoutes from "./protectedRoutes";

import SiteHeader from "./components/siteHeader/siteHeader.jsx";
import MovieSiteHeader from "./components/MovieSiteHeader"; // For authenticated users

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

// Conditional header based on authentication
const AppHeader = () => <MovieSiteHeader />;


const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContextProvider>
        {/* Conditional header */}
        <AppHeader />
        {/* Global movies context */}
        <MoviesContextProvider>
          <Routes>
            {/* Protected routes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
              <Route path="/my-reviews" element={<MyReviewsPage />} />
            </Route>

            {/* Public / other routes */}
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
            <Route path="/actors/:actorId" element={<ActorDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<StartPage />} />
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

// Render the App
const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
