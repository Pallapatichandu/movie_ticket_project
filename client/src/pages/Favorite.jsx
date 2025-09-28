import React from 'react';

import MovieCard from '../components/MovieCard';
import BlueCircle from '../components/BlueCircle';
import { useAppContext } from '../context/AppContext';

const Favorite = () => {
  const { favoriteMovies } = useAppContext()
  return (
    <div className="position-relative container py-5 overflow-hidden mt-3">
      {/* Blur Circles */}
      <BlueCircle top="-100px" left="-50px" />
      <BlueCircle bottom="-150px" right="-50px" />

      {/* Heading */}
      <h1 className="mb-5 text-center fw-bold">Your Favorite Movies</h1>

      {/* Movies Grid */}
      {favoriteMovies.length > 0 ? (
        <div className="row g-4">
          {favoriteMovies.map((movie) => (
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

export default Favorite;
