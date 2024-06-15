import React, { useState } from "react";
import Modal from "./Modal";
export function Cards({ movie, onClick }) {
  const [showDetails, setShowDetails] = useState(false);
  const [liked, setLiked] = useState(false);
  const [watched, setWatched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!movie) return null; // Return null if movie is undefined or null
  const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropURL = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  const trailerURL = `https://www.youtube.com/embed/${movie.trailer_youtube_id}`;
  const handleClick = () => {
    setShowDetails(!showDetails); // Toggle the showDetails state variable
  };
  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked((prevLiked) => !prevLiked);
  };
  const handleWatchClick = (event) => {
    event.stopPropagation();
    setWatched((prevWatched) => !prevWatched);
  };

  // Define fetchRuntime function to get runtime data
  async function fetchRuntime(runtimeId) {
    const runtimeResponse = await fetch(`https://api.themoviedb.org/3/movie/${runtimeId}?api_key=61af4d839a45ade634e31d5d042c907a&language=en`);
    const runtimeData = await runtimeResponse.json();
    return runtimeData.runtime;
  }

// Define fetchGenreNames function to get genre names
async function fetchGenreNames(genreIds) {
  const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=61af4d839a45ade634e31d5d042c907a&language=en`);
  const genresData = await genreResponse.json();
  const genreMap = genresData.genres.reduce((acc, { id, name }) => {
    acc[id] = name;
    return acc;
  }, {});
  return genreIds.map(id => genreMap[id]);
}

// Modify handleCardClick function
async function handleCardClick(movie) {
  setSelectedMovie({ ...movie });

  // Fetch runtime and genre names in parallel using Promise.all
  const [runtime, genreNames] = await Promise.all([
    fetchRuntime(movie.id),
    fetchGenreNames(movie.genre_ids),
  ]);

  // Update selectedMovie state with fetched data
  setSelectedMovie({ ...selectedMovie, runtime, genre: genreNames });

  setShowDetails(true);
}

  return (
    <>
      <div className="card-view" onClick={() => handleCardClick(movie)}>
        {/* Replace handleClick with handleCardClick */}
        <div className="card" style={{ width: '275px'}}>
          <img src={posterURL} alt={movie.title} style={{ width: '100%' }} />
          <h2>{movie.title}</h2>
          <h2>{movie.rating}</h2>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>{movie.vote_count}</span>
          <span style={{ fontSize: '24px' }} onClick={handleLikeClick}>
            {liked ? (
              <span style={{ color: 'purple' }}>&#9829;</span>
            ) : (
              <span style={{ color: 'black' }}>&#9829;</span>
            )}
          </span>
          <span style={{ fontSize: '24px', marginLeft: '10px' }} onClick={handleWatchClick}>
            {watched ? (
              <span style={{ color: 'purple' }}>+</span>
            ) : (
              <span>+</span>
            )}
          </span>
        </div>
      </div>
      {showDetails && (
        <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
          <h3>{movie.title}</h3>
          <video width="100%" controls autoPlay>
            <source src={trailerURL} type="video/youtube" />
          </video>
          <img src={backdropURL} alt={movie.title} style={{ width: '100%' }} />
          <p>Release Date: {movie.release_date}</p>
          <p>{movie.overview}</p>
          <p>Genre: {selectedMovie?.genre?.join(', ') || 'N/A'}</p>
          <p>Runtime: {selectedMovie?.runtime || 'N/A'}</p>
          <p>Average {movie.vote_average}</p>
        </Modal>
      )}
    </>
  );
}

export default Cards;
