import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies } from '../tmdb-api.js'; 

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

export default router;
