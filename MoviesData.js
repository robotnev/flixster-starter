async function fetchDataFromTMDb(url) {
  const response = await fetch(url);
  return await response.json();
}
export async function getMoviesData(count) {
  const apiKey = "61af4d839a45ade634e31d5d042c907a"; // Replace with your actual API key
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&include_video=false&page_limit=${count}`;
  try {
    const data = await fetchDataFromTMDb(url);
    return data.results;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
}
