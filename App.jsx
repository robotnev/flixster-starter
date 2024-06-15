// App.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import CardsList from "./Cards/CardsList";
import Footer from "./Footer";
import { getMoviesData } from "./MoviesData";
import About from "./About";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchCleared, setIsSearchCleared] = useState(false);
  const handleSearchClick = () => {
    setSearchQuery("");
    setIsSearchCleared(true);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await getMoviesData(50);
      setMovies(movieData);
    };
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <Banner />
      <SearchBar />
      <CardsList movies={movies} />
      <About />
      <Footer />
    </div>
  );
}

export default App;
