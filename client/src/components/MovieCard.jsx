


import React from "react";
import { useNavigate } from "react-router-dom";
import { Star as StarIcon } from "lucide-react";
import timeFormate from "../lib/timeFormat";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
    const { image_base_url } = useAppContext();


  return (
    <div
      className="card bg-dark text-white border-0 shadow-sm rounded-4 h-100"
      style={{
        width: "260px",
        transition: "transform 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Movie Poster */}
      <img
        src={image_base_url + movie.backdrop_path}
        alt={movie.title}
        className="card-img-top rounded-top-4"
        style={{
          height: "210px",
          objectFit: "cover",
          objectPosition: "right bottom",
        }}
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
      />

      {/* Movie Info */}
      <div className="card-body d-flex flex-column p-3">
        <h6 className="card-title fw-semibold text-truncate mb-1">
          {movie.title}
        </h6>
        <p className="small text-light opacity-75 mb-3">
          {new Date(movie.release_date).getFullYear()} ·{" "}
          {movie.genres.slice(0, 2).map((g) => g.name).join(" | ")} ·{" "}
          {timeFormate(movie.runtime)} 
        </p>

        {/* Actions */}
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <button
            className="btn btn-primary btn-sm rounded-pill px-3"
            onClick={() => {
              navigate(`/movies/${movie._id}`);
              scrollTo(0, 0);
            }}
          >
            Buy Ticket
          </button>

          <span className="d-flex align-items-center small">
  <StarIcon size={16} className="me-1 text-warning" />
  {movie.vote_average !== undefined && movie.vote_average !== null
    ? movie.vote_average.toFixed(1)
    : "N/A"}
</span>

        </div>
      </div>
    </div>
  );
};

export default MovieCard;

