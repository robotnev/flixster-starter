import React, { useState } from "react";
import Cards from "./Cards";
import Modal from "./Modal";

const DEFAULT_MOVIES_TO_SHOW = 10;

function sortMovies(movies, sortBy) {
  if (!movies || !sortBy) return movies;
  return [...movies].sort((a, b) => {
    switch (sortBy) {
    case "alphabetic":
        return a.title.localeCompare(b.title);
    case "release":
      movies.sort((a, b) => {new Date(a.release_date) - new Date(b.release_date)});
    case "rating":
        return b.vote_average - a.vote_average;
    }
  });
}

function CardsList({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(DEFAULT_MOVIES_TO_SHOW);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState("alphabetic");
  const [searchQuery, setSearchQuery] = useState(""); // Add state variable for search query

  const displayMovies = sortMovies(movies, sortBy).slice(0, currentIndex);

  const handleCardClick = (movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleShowMoreClick = () => {
    setCurrentIndex(currentIndex + DEFAULT_MOVIES_TO_SHOW);
  };

  const handleFilterChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortClick = () => {
    setSortBy("alphabetic"); // You can change this to another sorting option if needed
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (searchQuery === "") {
    // If there is no search query, show all movies
    return (
      <div className="card-list-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={handleFilterChange}>
          <option value="alphabetic">Alphabetic</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>
        <button className="sort-button" onClick={handleSortClick}>
          Sort
        </button>
        {displayMovies.map((movie) => (
          <Cards key={movie.id} movie={movie} onClick={handleCardClick} />
        ))}
        {selectedMovie && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.storyline}</p>
          </Modal>
        )}
        {currentIndex < 100 && (
          <button onClick={handleShowMoreClick}>Show More</button>
        )}
      </div>
    );
  } else {
    // If there is a search query, only show the matching movies
    return (
      <div className="card-list-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={handleFilterChange}>
          <option>
            {filteredMovies.length} results for "{searchQuery}"
          </option>
        </select>
        {filteredMovies.map((movie) => (
          <Cards key={movie.id} movie={movie} onClick={handleCardClick} />
        ))}
        {selectedMovie && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.storyline}</p>
          </Modal>
        )}
      </div>
    );
        }
      }
export default CardsList;
