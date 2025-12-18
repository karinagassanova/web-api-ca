import express from 'express';
import Review from './reviewModel.js';
import authenticate from '../../authenticate/index.js';

const router = express.Router();

// Create a new review
router.post('/', authenticate, async (req, res) => {
  try {
    const { movieId, rating, content } = req.body;

    if (!movieId || rating === undefined || !content) {
      return res
        .status(400)
        .json({ msg: 'movieId, rating and content are required' });
    }

    const review = await Review.create({
      user: req.user._id,
      username: req.user.username,
      movieId: Number(movieId),
      rating,
      content,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ msg: 'Failed to create review' });
  }
});

// Get all reviews for a given movie for the logged-in user
router.get('/movie/:movieId', authenticate, async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);
    const reviews = await Review.find({
      movieId,
      user: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching movie reviews:', err);
    res.status(500).json({ msg: 'Failed to fetch movie reviews' });
  }
});

// Get all reviews for the logged-in user
router.get('/me', authenticate, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching user reviews:', err);
    res.status(500).json({ msg: 'Failed to fetch user reviews' });
  }
});

// Update a review (only by owner)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { rating, content } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ msg: 'Not authorized to update review' });
    }

    if (rating !== undefined) review.rating = rating;
    if (content !== undefined) review.content = content;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ msg: 'Failed to update review' });
  }
});

// Delete a review (only by owner)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ msg: 'Not authorized to delete review' });
    }

    await review.deleteOne();
    res.json({ msg: 'Review deleted' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ msg: 'Failed to delete review' });
  }
});

export default router;


