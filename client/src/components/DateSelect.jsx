

import React, { useState } from "react";
import BlueCircle from "./BlueCircle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      id="dateSelect"
      className="position-relative p-4 p-md-5 mt-5 rounded shadow"
      style={{
        backgroundColor: "rgba(13, 27, 42, 0.85)",
        border: "1px solid rgba(65,90,119,0.6)",
      }}
    >
      {/* Blur Circles */}
      <BlueCircle top="100px" left="-100px" />
      <BlueCircle top="100px" right="0px" />

      <p className="h5 fw-semibold text-light">Choose Date</p>

      {/* Date Scroll */}
      <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
        <button className="btn btn-outline-light btn-sm">
          <ChevronLeft />
        </button>

        <div className="d-flex flex-wrap gap-3">
          {Object.keys(dateTime).map((date) => (
            <button
              key={date}
              onClick={() => setSelected(date)}
              className={`d-flex flex-column align-items-center justify-content-center rounded fw-medium px-3 py-2 transition ${
                selected === date
                  ? "bg-primary text-white"
                  : "bg-dark text-white border border-primary"
              }`}
              style={{
                minWidth: "70px",
                cursor: "pointer",
              }}
            >
              <span className="fs-6 fw-bold">{new Date(date).getDate()}</span>
              <span className="small">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </span>
            </button>
          ))}
        </div>

        <button className="btn btn-outline-light btn-sm">
          <ChevronRight />
        </button>
      </div>

      {/* Book Button */}
      <button
        onClick={onBookHandler}
        className="btn btn-primary mt-4 px-4 py-2 fw-semibold"
      >
        Book Now
      </button>

      {/* Extra CSS for hover clarity */}
      <style>
        {`
          #dateSelect button:hover {
            background-color: #e63946 !important;
            border-color: #e63946 !important;
            color: #fff !important;
          }
        `}
      </style>
    </div>
  );
};

export default DateSelect;
