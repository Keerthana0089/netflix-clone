// MovieCard.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const navigate = useNavigate();

  const toggleFavorite = (e) => {
    e.stopPropagation(); // prevent parent navigation
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>

      <button
        className={`fav-btn ${isFavorite ? "favorited" : ""}`}
        onClick={toggleFavorite}
      >
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
        {isFavorite ? " Favorited" : " Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
