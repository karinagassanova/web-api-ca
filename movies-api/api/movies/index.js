import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getMovie, getGenres } from '../tmdb-api.js';

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

  // Get genres
  router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
  }));

// Get single movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
  }));

export default router;
