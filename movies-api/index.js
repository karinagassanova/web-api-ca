import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies/index.js';   
import usersRouter from './api/users/index.js';
import userMoviesRouter from './routes/userMovies.js';
import actorsRouter from './api/actors/index.js'; 
import reviewsRouter from './api/reviews/index.js';

// other imports
import cors from 'cors';
import './db/index.js';
dotenv.config();
// eslint-disable-next-line no-unused-vars
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  console.error('Error:', err);
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).json({ msg: 'Something went wrong!' });
  }
  res.status(500).json({ 
    msg: 'Internal server error',
    error: err.message,
    stack: err.stack 
  });
};

const app = express();

const port = process.env.PORT;
// Enable CORS for all requests      
app.use(cors());  
app.use(express.json());                  
app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);
app.use('/api/usermovies', userMoviesRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/reviews', reviewsRouter);

app.use((req, res) => {
  res.status(404).json({ msg: `Route not found: ${req.method} ${req.path}` });
});

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

