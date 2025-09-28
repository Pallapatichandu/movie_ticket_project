

import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Tittle from "./Tittle";
import Loading from "../../components/Loding";
import dateFormate from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {
  const { axios, getToken, user } = useAppContext()
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
 try {
  const { data } = await axios.get("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
  setBookings(data.bookings)
 } catch (error) {
  console.error(error)
  
 }
 setIsLoading(false)
  };

  useEffect(() => {
    if(user){

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
            {bookings.map((item, index) => (
              <tr key={index}>
                <td className="px-3">{item.user.name}</td>
                <td className="px-3">{item.show.movie.title}</td>
                <td className="px-3">{dateFormate(item.show.showDateTime)}</td>
                <td className="px-3">{item.bookedSeats.join(", ")}</td>
                <td className="px-3">
                  {currency} {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;

