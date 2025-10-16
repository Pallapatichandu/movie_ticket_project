import React, { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useAppContext } from "../context/AppContext";

const Movies = () => {
  const { shows } = useAppContext();

  // Set body background and text color
  useEffect(() => {
    document.body.style.backgroundColor = "#0d1b2a"; // dark full-page background
    document.body.style.color = "#ffffff";           // text color
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  // ✅ Filter out deleted/null or missing _id movies
  const validShows = Array.isArray(shows)
    ? shows.filter((movie) => movie && movie._id)
    : [];

  return (
    <div className="container py-5 mt-3" style={{ minHeight: "100vh" }}>
      {/* Heading */}
      <h1 className="mb-5 text-center fw-bold">Now Showing</h1>

      {/* Movies Grid */}
      {validShows.length > 0 ? (
        <div className="row g-4">
          {validShows.map((movie) => (
            <div
              key={movie._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No movies currently available.</p>
      )}
    </div>
  );
};

export default Movies;
