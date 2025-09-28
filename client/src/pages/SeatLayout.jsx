


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../components/Loding";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeformat";
import BlueCircle from "../components/BlueCircle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const navigate = useNavigate();
  const { axios, getToken, user } = useAppContext();

  // Fetch show details
  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) setShow(data);
      else toast.error("Show not found");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch show details");
    }
  };

  // Fetch occupied seats for selected time
 const getOccupiedSeats = async () => {
  if (!selectedTime?.showId) return;
  try {
    const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`);

    if (data.success) {
      setOccupiedSeats(data.occupiedSeats); // note: occupiedSeats, not occupiedSeates
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch occupied seats");
  }
};



  // Handle seat click
  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select a time first");
    if (occupiedSeats.includes(seatId)) return toast("This seat is already booked");
    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast("You can only select up to 5 seats");

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  // Render seats for a row
  const renderSeats = (row, count = 9) => (
    <div key={row} className="d-flex flex-wrap gap-2 justify-content-center">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`btn btn-sm rounded ${
              selectedSeats.includes(seatId)
                ? "btn-primary text-white"
                : "btn-outline-secondary text-light"
            } ${occupiedSeats.includes(seatId) ? "opacity-50" : ""}`}
            style={{
              width: "40px",
              height: "40px",
              fontSize: "12px",
              transition: "0.2s",
            }}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  // Book tickets
const bookTickets = async () => {
  try {
    if (!user) return toast.error("Please login to proceed");
    if (!selectedTime || selectedSeats.length === 0)
      return toast.error("Please select a time and seats");

    // POST request to create booking
    const { data } = await axios.post(
      "/api/booking/create",
      { showId: selectedTime.showId, selectedSeats },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );

    if (data.success) {
      window.location.href=data.url
      

    } else {
      toast.error(data.message || data.error);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to book tickets");
  }
};


  // Fetch show on component mount
  useEffect(() => {
    getShow();
  }, []);

  // Fetch occupied seats when time changes
  useEffect(() => {
    getOccupiedSeats();
  }, [selectedTime]);

  if (!show) return <Loading />;

  // Use correct property 'shows' instead of 'dateTime'
  const timings = show?.shows?.[date] || [];

  return (
    <div
      className="container-fluid py-5 d-flex flex-column flex-md-row position-relative text-light mt-5"
      style={{ backgroundColor: "rgba(13, 27, 42, 0.95)", minHeight: "100vh" }}
    >
      {/* Blur Circles */}
      <BlueCircle top="-120px" left="-120px" />
      <BlueCircle top="-120px" right="-120px" />
      <BlueCircle bottom="-120px" left="-120px" />
      <BlueCircle bottom="-120px" right="-120px" />

      {/* Available Timings */}
      <div className="col-md-3 bg-dark bg-opacity-50 border border-primary rounded p-4 sticky-md-top mt-5">
        <p className="h5 fw-semibold">Available Timings</p>
        <div className="mt-3">
          {timings.length > 0 ? (
            timings.map((item) => (
              <div
                key={item.time}
                onClick={() => {
                  setSelectedTime(item);
                  setSelectedSeats([]); // reset seat selection on time change
                }}
                className={`d-flex align-items-center gap-2 px-3 py-2 rounded mb-2 cursor-pointer ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "border border-secondary text-light"
                }`}
                style={{ width: "fit-content", transition: "0.3s" }}
              >
                <ClockIcon size={16} />
                <p className="mb-0">{isoTimeFormat(item.time)}</p>
              </div>
            ))
          ) : (
            <p className="text-secondary small">No timings available</p>
          )}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="col-md-9 d-flex flex-column align-items-center mt-5 mt-md-0 position-relative">
        <h2 className="mb-4">Select Your Seats</h2>
        <img
          src={assets.screenImage}
          alt="screen"
          className="img-fluid mb-2"
          style={{ maxWidth: "400px" }}
        />
        <p className="text-secondary small mb-4">SCREEN SIDE</p>

        <div className="d-flex flex-column align-items-center mt-3">
          {/* First Row Group */}
          <div
            className="d-grid gap-4 mb-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          {/* Other Row Groups */}
          <div className="d-grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx} className="d-flex flex-column gap-3">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Seat Count Info */}
        <p className="text-warning mt-3">
          {selectedSeats.length}/5 seats selected
        </p>

        {/* Checkout Button */}
        <button
          onClick={bookTickets}
          className="btn btn-primary mt-5 d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
          disabled={selectedSeats.length === 0 || !selectedTime}
        >
          Proceed to Checkout
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;

