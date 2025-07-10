import React from "react";
import "./Navbar.css";
import logo from "../../assets/netflix-logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHeart, FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <img src={logo} alt="App Logo" className="navbar__logo" />

      <div className="navbar__menu">
        <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>

        <Link
          to="/favorites"
          className={`nav-item ${isActive("/favorites") ? "active" : ""}`}
        >
          <FaHeart className="nav-icon" />
          <span>Favorites</span>
        </Link>

        <Link
          to="/search"
          className={`nav-item ${isActive("/search") ? "active" : ""}`}
        >
          <FaSearch className="nav-icon" />
          <span>Search</span>
        </Link>
      </div>

      <div className="navbar__right">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
