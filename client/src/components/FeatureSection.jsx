

import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlueCircle from "./BlueCircle";

import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";

const FeatureSection = () => {
  const navigate = useNavigate();
  const {shows}=useAppContext()

  return (
    <div
      className="container-fluid px-3 px-md-4 px-lg-5 px-xl-5 overflow-hidden position-relative"
      style={{ backgroundColor: "rgb(18, 18, 18)" }}
    >
      {/* Blue Glow Circle */}
      <BlueCircle top="0" right="-80px" />

      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center pt-5 pb-3">
        <p
          className="mb-0"
          style={{ color: "#d1d5db", fontWeight: 500, fontSize: "1rem" }}
        >
          Now Showing
        </p>

        <button
          type="button"
          onClick={() => navigate("/movies")}
          className="btn d-flex align-items-center p-0 view-all-btn"
          style={{ color: "white" }}
        >
          View All
          <ArrowRight size={18} className="ms-1 transition-arrow" />
        </button>
      </div>

      {/* Movies Grid */}
      <div className="row g-4 mt-4 justify-content-center">
        {shows.slice(0, 4).map((shows) => (
          <div
            key={shows._id}
            className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <MovieCard movie={shows} />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="btn btn-primary px-4 py-2 fw-medium rounded"
        >
          Show More
        </button>
      </div>

      {/* Extra Styling */}
      <style>
        {`
          .view-all-btn {
            font-size: 0.85rem;
            background: none;
            border: none;
            cursor: pointer;
          }

          .view-all-btn:hover .transition-arrow {
            transform: translateX(2px);
            transition: transform 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default FeatureSection;


