

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlueCircle from "../components/BlueCircle";
import { Heart, Play, Star } from "lucide-react";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loding from "../components/Loding";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const { shows, axios, getToken, user, image_base_url, fetchFavoriteMovies, favoriteMovies } = useAppContext();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setShow(data); // keep full API response
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch movie details");
    }
  };

  const handleFavorite = async () => {
  try {
    if (!user) return toast.error("Please login to proceed");

    const isFav = favoriteMovies.some(
      (movie) => movie._id === id || movie.tmdbId === id
    );

    // Send remove flag if it's already favorite
    const { data } = await axios.post(
      "/api/user/update-favorite",
      { movieId: id, remove: isFav }, // backend should handle add/remove based on `remove` flag
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    if (data.success) {
      await fetchFavoriteMovies(); // refresh favorites
      toast.success(isFav ? "Favorite Removed" : "Favorite Added");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update favorite");
  }
};


  useEffect(() => {
    getShow();
  }, [id]);

  const timeFormat = (runtime) => {
    if (!runtime) return "N/A";
    const hrs = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hrs}h ${mins}m`;
  };

  if (!show) return <Loding />;

  const isFavorite = favoriteMovies.some((movie) => movie._id === id || movie.tmdbId === id);

  return (
    <div className="container-fluid py-5 position-relative" style={{ backgroundColor: "#0d1b2a", minHeight: "100vh", color: "#fff" }}>
      {/* Blur Background Circles */}
      <BlueCircle top="-100px" left="-100px" />
      <BlueCircle bottom="-100px" right="0px" />

      <div className="container">
        <div className="row g-4 align-items-start mt-4">
          {/* Poster */}
          <div className="col-md-4 text-center">
            <img
              src={image_base_url + show.movie.poster_path}
              alt={show.movie.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
          </div>

          {/* Movie Details */}
          <div className="col-md-8">
            <span className="badge bg-primary mb-2">ENGLISH</span>
            <h1 className="display-5 fw-bold text-white">{show.movie.title}</h1>

            <div className="d-flex align-items-center mb-2">
              <Star size={20} className="text-warning me-2" />
              <span className="text-light">{show.movie.vote_average?.toFixed(1)} User Rating</span>
            </div>

            <p className="text-light">{show.movie.overview}</p>

            <p className="text-light fw-semibold">
              {timeFormat(show.movie.runtime)} · {show.movie.genres.map((g) => g.name).join(", ")} ·{" "}
              {show.movie.release_date?.split("-")[0]}
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mt-4">
              <button className="btn btn-dark d-flex align-items-center gap-2">
                <Play size={18} /> Watch Trailer
              </button>

              <a href="#dateSelect" className="btn btn-primary fw-medium px-4">
                Buy Tickets
              </a>

              <button onClick={handleFavorite} className="btn btn-outline-danger rounded-circle p-2">
                <Heart size={20} className={isFavorite ? "fill-primary text-primary" : "text-danger"} />
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-5">
          <h2 className="h5 mb-3 text-white">Your Favorite Cast</h2>
          <div className="d-flex overflow-auto pb-3" style={{ gap: "1.5rem" }}>
            {show.movie.casts?.slice(0, 12).map((cast, index) => (
              <div key={index} className="text-center" style={{ minWidth: "80px" }}>
                <img
                  src={image_base_url + cast.profile_path}
                  alt={cast.name}
                  className="rounded-circle shadow"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <p className="mt-2 small fw-medium text-light">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <DateSelect dateTime={show.shows} id={id} />

        {/* Recommendations */}
        <p className="fs-5 fw-semibold mt-5 mb-4 text-white">You May Also Like</p>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {shows?.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={() => {
              navigate("/movies");
              window.scrollTo(0, 0);
            }}
            className="btn btn-primary px-5 py-2"
          >
            Show More
          </button>
        </div>
      </div>

      <style>
        {`
          #dateSelect .btn {
            background-color: #1b263b;
            color: #ffffff;
            border: 1px solid #415a77;
            transition: all 0.3s ease-in-out;
          }
          #dateSelect .btn:hover {
            background-color: #e63946;
            border-color: #ffffff;
            color: #ffffff;
          }
        `}
      </style>
    </div>
  );
};

export default MovieDetails;


