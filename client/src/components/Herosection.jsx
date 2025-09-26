import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, Calendar1Icon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{
        backgroundImage: `url("/backgroundImage.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        padding: "2rem 3rem",
      }}
    >
      {/* Logo */}
      <img
        src={assets.marvelLogo}
        alt="Marvel Logo"
        className="mb-4"
        style={{ maxHeight: "45px" }}
      />

      {/* Movie Title */}
      <h1
        className="fw-bold"
        style={{ fontSize: "4rem", lineHeight: "1.1", maxWidth: "700px",color:"white" }}
      >
        Guardians <br /> of the Galaxy
      </h1>

      {/* Movie Info */}
      <div className="d-flex align-items-center gap-3 text-light mb-3">
        <span>Action | Adventure | Sci-Fi</span>
        <div className="d-flex align-items-center gap-2">
          <Calendar1Icon size={18} /> 2018
        </div>
        <div className="d-flex align-items-center gap-2">
          <ClockIcon size={18} /> 2h 10m
        </div>
      </div>

      {/* Description */}
      <p
        className="text-light mb-4"
        style={{ maxWidth: "500px", fontSize: "1rem" }}
      >
        In a post-apocalyptic world where cities ride on wheels and consume each
        other to survive, two people meet in London and try to stop a conspiracy.
      </p>

      {/* Explore Movies Button */}
      <button
        onClick={() => navigate("/movies")}
        className="btn btn-primary rounded-pill d-flex align-items-center gap-2 "
        style={{width:"180px"}}
        
      >
        Explore Movies <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default Herosection;
