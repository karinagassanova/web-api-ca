# Assignment 2 - Web API.

Name: Karine Gassanova

## Overview
**React Movies App** is a full-stack web application that allows users to browse movies, view actor details, manage personal watchlists and favorites, and create reviews. The application uses **React** for the frontend and a **custom Movies API, Users API, and Reviews API** for the backend.  

Key points:  
- The frontend no longer calls TMDB directly; all movie and actor data are retrieved via the **Movies API**.  
- Users can sign up, log in, and manage **user-specific content** (favorites, must-watch, reviews, viewing history).  
- Authentication uses **JWT tokens**, with validation on page load and token handling for secure access.  

---

## Features

### Frontend (React)
- **Movie Browsing**: Fetches movie data from the Movies API for the homepage, search, and movie detail pages.  
- **Actor Details**: View actor profiles and associated movies via actor endpoints in the Movies API.  
- **Authentication**:  
  - Signup/Login with JWT token validation.  
  - User data cleared on logout.  
  - JWT validation on page load.  
- **User-Specific Content**:  
  - Favorites  
  - Must-watch list  
  - Reviews (full CRUD)  
  - Viewing history  
- **Protected Routes**: Authenticated routes are protected; public movie pages remain accessible.  
- **Dynamic Header**: Shows different UI for logged-in users (welcome message, logout button) versus guests.  
- **Interactive UI**:  
  - Add/remove movies to favorites and must-watch lists using interactive buttons.  
  - Create and view reviews on movies.  
  - View all personal reviews on the “My Reviews” page.

### Backend (Movies API / Users API / Reviews API)
- **Movies API**:  
  - Serves movie and actor data from TMDB.  
  - Endpoints:  
    - `movies-api/api/movies/index.js`  
    - `movies-api/api/movies/tmdb-api.js`  
    - `movies-api/api/actors/index.js`  
    - `movies-api/api/actors/tmdb-api.js`  
    - `movies-api/api/index.js`  
- **Users API**:  
  - Handles authentication, favorites, must-watch lists, and JWT verification.  
  - Password hashing for security.  
  - Endpoints and models:  
    - `movies-api/api/users/index.js`  
    - `movies-api/api/users/userModel.js`  
    - `movies-api/api/routes/userMovies.js`  
- **Reviews API**:  
  - Full CRUD for user reviews with MongoDB persistence.  
  - Endpoints and models:  
    - `movies-api/api/reviews/index.js`  
    - `movies-api/api/reviews/reviewModel.js`  
    - `movies-api/api/index.js`  

---

## Key Implementations

### Movies & Actors
- Frontend pages fetch movie and actor data **via the Movies API** instead of directly calling TMDB.  
- Actor endpoints provide **detailed actor info and associated movies**.  
- API helpers abstract all network requests for cleaner frontend code.

### User-Specific Content
- Users can **add/remove movies** from favorites and must-watch lists.  
- AuthContext and MoviesContext are integrated to **refresh user-specific data** on login/logout.  
- JWT validation ensures secure access and clears user data on logout.  
- Protected routes restrict access to authenticated-only pages while keeping public pages accessible.

### Reviews
- Users can **create, read, update, and delete reviews**.  
- Reviews are stored in MongoDB and are **user-specific**.  
- Frontend components handle review creation (`reviewForm`) and display (`movieReviews`).  
- Users can view all their reviews on the **“My Reviews”** page.

---

## Technologies Used
- **Frontend**: React, React Router, Material UI, Context API  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)  
- **Authentication**: JWT, bcrypt for password hashing  
- **APIs**: Movies API (proxy to TMDB), Users API, Reviews API  

---
