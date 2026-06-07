# 🎬 Movie Catalog

A modern movie discovery web application built with React, Vite, and Tailwind CSS.

## Features

- 🔍 Search movies by title
- 🎥 View detailed movie information
- ⭐ Check ratings, genres, runtime, and release dates
- 🎬 Watch official movie trailers
- ❤️ Add and remove movies from Favorites
- 📱 Responsive design for desktop, tablet, and mobile devices
- ⚡ Fast performance powered by Vite
- 🎨 Modern UI built with Tailwind CSS

## Technologies Used

- React
- Vite
- React Router DOM
- Context API
- Tailwind CSS
- TMDB API

## Project Structure

text src/ ├── components/ │   ├── LoadingSpinner.jsx │   ├── MovieCard.jsx │   └── Navbar.jsx │ ├── contexts/ │   ├── FavoritesContext.jsx │   └── FavoritesProvider.jsx │ ├── pages/ │   ├── Home.jsx │   ├── Favorites.jsx │   └── MovieDetails.jsx │ ├── services/ │   └── api.js │ ├── css/ │   └── App.css │ ├── App.jsx └── main.jsx 

## Installation

Clone the repository:

bash git clone <repository-url> 

Navigate to the project folder:

bash cd react-movie-app 

Install dependencies:

bash npm install 

Create a .env file and add your TMDB API key:

env VITE_TMDB_API_KEY=your_api_key 

Start the development server:

bash npm run dev 

Build for production:

bash npm run build 

## Screenshots

Add screenshots of the Home Page, Movie Details Page, and Favorites Page here.

## Author

Developed as a React frontend project using TMDB API.