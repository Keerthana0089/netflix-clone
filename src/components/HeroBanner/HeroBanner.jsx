import React, { useEffect, useState } from "react";
import "./HeroBanner.css";
import { fetchMovies } from "../../api/movieApi";

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getFeaturedMovie() {
      const movies = await fetchMovies();
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
    getFeaturedMovie();
  }, []);

  if (!movie) return null;

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="hero-content">
        <h1>{movie.title || movie.name}</h1>
        <p>{movie.overview.substring(0, 250)}...</p>
      </div>
    </div>
  );
};

export default HeroBanner;
