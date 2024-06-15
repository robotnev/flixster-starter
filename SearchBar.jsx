import React, { useState } from 'react';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async event => {
  event.preventDefault();
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=61af4d839a45ade634e31d5d042c907a&language=en-US&query=${encodeURIComponent(searchQuery)}`);
    const data = await response.json();
    setResults(data.results);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setShowResults(true);
  }
};


  const handleHomeClick = () => {
    setSearchQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Enter a movie name..." />
        <button type="submit">Search</button>
      </form>
      { showResults && (
        <>
          <ul>
            {results.map(movie => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          <button onClick={handleHomeClick}>Back to home</button>
        </>
      )}
    </div>
  );
}

export default SearchBar;
