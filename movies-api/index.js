import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies/index.js';   
import authenticate from './authenticate/index.js';
import usersRouter from './api/users/index.js';
// other imports
import cors from 'cors';
import './db/index.js';
dotenv.config();
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
};

const app = express();

const port = process.env.PORT;
// Enable CORS for all requests
app.use(cors());
app.use('/api/movies', moviesRouter); 
app.use(express.json());
app.use('/api/users', usersRouter);
app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
