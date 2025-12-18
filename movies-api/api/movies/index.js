import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getMovie, getGenres, getMovieImages, getMovieReviews, getMovieCredits, getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getMovieRecommendations, getLanguages} from '../tmdb-api.js';

const router = express.Router();

// Discover movies for homepage
router.get('/discover', asyncHandler(async (req, res) => {
  const discoverMovies = await getMovies();
  res.status(200).json(discoverMovies);
}));

// Upcoming movies list
router.get('/upcoming', asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const upcoming = await getUpcomingMovies(page);
  res.status(200).json(upcoming);
}));

// Get popular movies
router.get('/popular', asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const popular = await getPopularMovies(page);
    res.status(200).json(popular);
  }));
  
  // Get top rated movies
  router.get('/top-rated', asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const topRated = await getTopRatedMovies(page);
    res.status(200).json(topRated);
  }));
  
  // Get now playing movies
  router.get('/now-playing', asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const nowPlaying = await getNowPlayingMovies(page);
    res.status(200).json(nowPlaying);
  }));
  
  // Get movie recommendations - must come BEFORE /:id
  router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recommendations = await getMovieRecommendations(id);
    res.status(200).json(recommendations);
  }));

  // Get genres
  router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
  }));

  // Get languages
router.get('/languages', asyncHandler(async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
  }));
  
  // Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
  }));
  
  // Get movie reviews
  router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
  }));
  
  // Get movie credits
  router.get('/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getMovieCredits(id);
    res.status(200).json(credits);
  }));

// Get single movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
  }));

export default router;
