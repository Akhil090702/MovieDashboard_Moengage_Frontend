import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MovieCard.css";
import api from "../utils/api";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [imdbRating, setimdbRating] = useState(0);

  const fetchMovieRating = async () => {
    try {
      const res = await api.get(`/id${movie.imdbID}`);
      setimdbRating(res.data.imdbRating);
    } catch (err) {
      console.error("Error fetching Ratings:", err);
    }
  };

  useEffect(() => {
    fetchMovieRating();
  }, []);

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="movie-card"
    >
      {movie.Poster && movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} />
      ) : (
        <div className="no-image">No Image Available</div>
      )}

      <div className="movie-card-content">
        <h2>{movie.Title}</h2>
        <div className="info">
          <span>📅 {movie.Year}</span>
          {imdbRating && <span className="rating">⭐ {imdbRating}</span>}
        </div>
        {movie.Runtime && movie.Runtime !== "N/A" && (
          <p className="runtime">⏱ {movie.Runtime}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
