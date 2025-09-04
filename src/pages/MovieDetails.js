import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import "../css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {

    try {
      const res = await api.get(`/id/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie)
    return <p className="loading-message">Loading movie details...</p>;

  return (
    <div className="movie-details-container">
      <div className="movie-header">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
          className="movie-poster"
        />
        <div className="movie-basic-info">
          <h1>{movie.Title}</h1>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Rating:</strong> {movie.imdbRating} ⭐
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
          <p>
            <strong>Box Office:</strong> {movie.BoxOffice}
          </p>
          <p>
            <strong>Released:</strong> {movie.Released}
          </p>
          <p>
            <strong>Rated:</strong> {movie.Rated}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="imdb-link"
          >
            View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
