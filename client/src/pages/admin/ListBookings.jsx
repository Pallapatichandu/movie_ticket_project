import React, { useEffect, useState } from "react";
import Tittle from "./Tittle";
import Loading from "../../components/Loding";
import dateFormate from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {
  const { axios, getToken, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  return !isLoading ? (
    <>
      <Tittle text1="List" text2="Bookings" />

      <div className="container mt-4 table-responsive">
        <table
          className="table table-bordered table-hover table-striped align-middle text-white"
          style={{ backgroundColor: "#0d1b2a" }}
        >
          <thead className="table-dark">
            <tr>
              <th className="px-3">User Name</th>
              <th className="px-3">Movie Name</th>
              <th className="px-3">Show Time</th>
              <th className="px-3">Seats</th>
              <th className="px-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((item, index) => {
                const userName = item?.user?.name || "Unknown User";
                const movieTitle = item?.show?.movie?.title || "Unknown Movie";
                const showTime = item?.show?.showDateTime
                  ? dateFormate(item.show.showDateTime)
                  : "N/A";
                const seats = item?.bookedSeats?.length
                  ? item.bookedSeats.join(", ")
                  : "No Seats";
                const amount = item?.amount || 0;

                return (
                  <tr key={index}>
                    <td className="px-3">{userName}</td>
                    <td className="px-3">{movieTitle}</td>
                    <td className="px-3">{showTime}</td>
                    <td className="px-3">{seats}</td>
                    <td className="px-3">
                      {currency} {amount}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-secondary">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
