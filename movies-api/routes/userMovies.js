import express from "express";
import authenticate from "../authenticate/index.js";

const router = express.Router();

// Get logged-in user's movies
router.get("/", authenticate, async (req, res) => {
  try {
    // Initialize arrays if they don't exist
    if (!req.user.favorites) {
      req.user.favorites = [];
    }
    if (!req.user.mustWatch) {
      req.user.mustWatch = [];
    }
    
    res.json({
      favorites: req.user.favorites || [],
      mustWatch: req.user.mustWatch || []
    });
  } catch (err) {
    console.error("Error fetching user movies:", err);
    res.status(500).json({ msg: "Failed to fetch user movies" });
  }
});

// Add favorite movie
router.post("/favorites", authenticate, async (req, res) => {
  try {
    const movieId = Number(req.body.movieId);

    if (!movieId) {
      return res.status(400).json({ msg: "Movie ID is required" });
    }

    // Initialize favorites array if it doesn't exist
    if (!req.user.favorites) {
      req.user.favorites = [];
    }

    if (!req.user.favorites.includes(movieId)) {
      req.user.favorites.push(movieId);
      await req.user.save();
    }

    res.json(req.user.favorites);
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).json({ msg: `Failed to add favorite: ${err.message}` });
  }
});

// Remove favorite movie
router.delete("/favorites/:id", authenticate, async (req, res) => {
  try {
    const movieId = Number(req.params.id);

    // Initialize favorites array if it doesn't exist
    if (!req.user.favorites) {
      req.user.favorites = [];
    }

    req.user.favorites = req.user.favorites.filter(id => id !== movieId);
    await req.user.save();
    res.json(req.user.favorites);
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).json({ msg: `Failed to remove favorite: ${err.message}` });
  }
});

// Add must-watch movie
router.post("/mustwatch", authenticate, async (req, res) => {
  try {
    const movieId = Number(req.body.movieId);

    if (!movieId) {
      return res.status(400).json({ msg: "Movie ID is required" });
    }

    // Initialize mustWatch array if it doesn't exist
    if (!req.user.mustWatch) {
      req.user.mustWatch = [];
    }

    if (!req.user.mustWatch.includes(movieId)) {
      req.user.mustWatch.push(movieId);
      await req.user.save();
    }

    res.json(req.user.mustWatch);
  } catch (err) {
    console.error("Error adding to must watch:", err);
    res.status(500).json({ msg: `Failed to add to must watch: ${err.message}` });
  }
});

// Remove must-watch movie
router.delete("/mustwatch/:id", authenticate, async (req, res) => {
  try {
    const movieId = Number(req.params.id);

    // Initialize mustWatch array if it doesn't exist
    if (!req.user.mustWatch) {
      req.user.mustWatch = [];
    }

    req.user.mustWatch = req.user.mustWatch.filter(id => id !== movieId);
    await req.user.save();
    res.json(req.user.mustWatch);
  } catch (err) {
    console.error("Error removing from must watch:", err);
    res.status(500).json({ msg: `Failed to remove from must watch: ${err.message}` });
  }
});

export default router;
