import React, { useContext } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./favorites.css";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="empty">You haven’t added any favorites yet 💔</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
