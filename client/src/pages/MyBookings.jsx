

import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";

import BlueCircle from "../components/BlueCircle";
import timeFormat from "../lib/timeFormat";
import dateFormat from "../lib/dateFormat";
import Loading from "../components/Loding";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const {  axios, getToken, user, image_base_url } = useAppContext()
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

 const getMyBookings = async () => {
  try {
    const { data } = await axios.get("/api/user/bookings", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    if (data.success) {
      setBookings(data.bookings);
    } else {
      setBookings([]);
    }
  } catch (error) {
    console.log(error);
    setBookings([]);
  }
  setIsLoading(false);
};



  useEffect(() => {
    if(user){

      getMyBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div
      className="container-fluid position-relative px-3 px-md-5 pt-5 mt-5"
      style={{ backgroundColor: "#0d1b2a", minHeight: "100vh", color: "#ffffff" }}
    >
      {/* 🔵 Blur Circles */}
      <BlueCircle top="-100px" left="-100px" />
      <BlueCircle bottom="-100px" right="0px" />

      {/* Title */}
      <h1 className="h4 fw-semibold mb-5 text-white text-center">My Bookings</h1>

      {/* Booking List: Side by Side */}
      <div className="d-flex flex-wrap justify-content-start gap-4">
        {bookings.length > 0 ? (
          bookings.map((item, index) => (
            <div
              className="card bg-dark text-light shadow-sm border border-primary border-opacity-25"
              style={{ width: "300px" }}
              key={index}
            >
              <img
                src={image_base_url + item.show.movie.poster_path}
                alt={item.show.movie.title}
                className="card-img-top rounded-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-white">{item.show.movie.title}</h5>
                <p className="text-secondary small mb-1">
                  Duration: {timeFormat(item.show.movie.runtime)}
                </p>
                <p className="text-secondary small mb-3">
                  Date: {dateFormat(item.show.showDateTime)}
                </p>

                <div className="mt-auto">
                  <p className="fw-bold text-primary h5 mb-2">
                    {currency} {item.amount}
                  </p>
                  {!item.isPaid && (
                    <Link to={item.paymentLink} className="btn btn-primary btn-sm rounded-pill mb-3">
                      Pay Now
                    </Link>
                  )}
                  <hr className="border-secondary" />
                  <p className="small mb-1">
                    <span className="text-secondary">Total Tickets:</span>{" "}
                    {item.bookedSeats?.length || 0}
                  </p>
                  <p className="small mb-0">
                    <span className="text-secondary">Seat Numbers:</span>{" "}
                    {item.bookedSeats?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary">No bookings found.</p>
        )}
      </div>
    </div>
  ) : (
    <Loading/>
  );
};

export default MyBookings;



