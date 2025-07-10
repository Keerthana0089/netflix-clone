import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import LandingPage from "./pages/landingPage/landingPage";
import SearchPage from "./pages/search/search";
import MovieDetails from "./pages/movieDetails/movieDetails";
import Favorites from "./pages/favorites/favorites";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

import "./styles/themes.css";
import { ThemeProvider } from "./context/ThemeContext";
function App() {
  return (
     <ThemeProvider>
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
