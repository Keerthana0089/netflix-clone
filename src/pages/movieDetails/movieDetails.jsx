import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieDetails,
  fetchRecommendations,
  fetchMovieImages,
} from "../../api/movieApi";
import Spinner from "../../components/Spinner/Spinner";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./movieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.some((m) => m.id === parseInt(id));

  const toggleFavorite = () => {
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  useEffect(() => {
    const loadData = async () => {
      const [details, recs, images] = await Promise.all([
        fetchMovieDetails(id),
        fetchRecommendations(id),
        fetchMovieImages(id),
      ]);
      setMovie(details);
      setRecommendations(recs.slice(0, 12));
      setBackdrops(images.length > 0 ? images.slice(0, 5) : [details.backdrop_path]);
      setLoading(false);
    };
    loadData();
  }, [id]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + backdrops.length) % backdrops.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % backdrops.length);
  };

  const backdropUrl = backdrops[currentIndex]?.file_path
    ? `https://image.tmdb.org/t/p/original${backdrops[currentIndex].file_path}`
    : `https://image.tmdb.org/t/p/original${backdrops[currentIndex]}`;

  if (loading) return <Spinner />;

  return movie ? (
    <div className="movie-details">
      <div
        className="backdrop-slide"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        {backdrops.length > 1 && (
          <>
            <button className="arrow left" onClick={handlePrev}>‹</button>
            <button className="arrow right" onClick={handleNext}>›</button>
          </>
        )}
      </div>

      <div className="details-content">
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="text-section">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
          <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
          <p className="overview">{movie.overview}</p>
          <button
            className={`fav-btn ${isFavorite ? "favorited" : ""}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
            {isFavorite ? " Remove from Favorites" : " Add to Favorites"}
          </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommend-section">
          <h2>You may also like</h2>
          <div className="recommend-list">
            {recommendations.map((recMovie) => (
              <MovieCard key={recMovie.id} movie={recMovie} />
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <p className="error">Movie not found.</p>
  );
};

export default MovieDetails;
