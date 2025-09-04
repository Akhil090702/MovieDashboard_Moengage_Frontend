import React, { useEffect, useState } from "react";
import api from "../utils/api";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieCard from "../components/MovieCard";

import "../css/Home.css";
import ViewStats from "../components/ViewStats";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const query = search
        ? `?q=${search}&page=${page}`
        : `?q=movie&page=${page}`;

      const res = await api.get(`/search${query}`);
      console.log("Backend response:", res);

      if (res.data && res.data.Search) {
        let movies = res.data.Search;
        const detailedMovies = await Promise.all(
          movies.map((m) => api.get(`/id${m.imdbID}`).then((res) => res.data))
        );
        movies = detailedMovies;
        if (genre) {
          movies = movies.filter(
            (m) =>
              m.Genre && m.Genre.toLowerCase().includes(genre.toLowerCase())
          );
        }
        const sortFunctions = {
          rating: (a, b) =>
            (parseFloat(b.imdbRating) || 0) - (parseFloat(a.imdbRating) || 0),
          year: (a, b) => (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0),
          title: (a, b) => a.Title.localeCompare(b.Title),
        };

        if (sort && sortFunctions[sort]) {
          movies = [...movies].sort(sortFunctions[sort]);
        }

        setMovies(movies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, genre, sort, page]);

  return (
    <div className="home-container">
      <div className="max-width">
        <h1>🎬 MovieFlix Dashboard</h1>

        <div className="filters-container">
          <SearchBar onSearch={setSearch} />
          <Filters onGenreChange={setGenre} onSortChange={setSort} />
        </div>
        <ViewStats />

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading Movies...</p>
          </div>
        ) : movies.length === 0 ? (
          <p className="no-movies">
            No movies found. Try searching for something else 🎥
          </p>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.imdbID}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
      {
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ⬅ Prev
          </button>

          <button onClick={() => setPage(page + 1)}>Next ➡</button>
        </div>
      }
    </div>
  );
};

export default Home;
