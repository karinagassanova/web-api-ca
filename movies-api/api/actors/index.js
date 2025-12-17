import express from 'express';
import asyncHandler from 'express-async-handler';
import { getActorDetails, getActorMovies } from '../tmdb-api.js';

const router = express.Router();

// Get actor details
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const actor = await getActorDetails(id);
  res.status(200).json(actor);
}));

// Get actor movies
router.get('/:id/movies', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movies = await getActorMovies(id);
  res.status(200).json(movies);
}));

export default router;