

import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loding';
import Tittle from './Tittle';
import dateFormate from '../../lib/dateFormat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListShows = () => {
  const { axios, getToken, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-shows", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setShows(Array.isArray(data.shows) ? data.shows : []);
      } else {
        toast.error(data.message || "Failed to fetch shows");
      }
    } catch (error) {
      console.error("❌ Error fetching shows:", error);
      toast.error("Error fetching shows. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllShows();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
      <Tittle text1="List" text2="Shows" />

      <div className="container mt-4 table-responsive">
        <table
          className="table table-bordered table-hover table-striped align-middle text-white"
          style={{ backgroundColor: '#0d1b2a' }}
        >
          <thead className="table-dark">
            <tr>
              <th className="px-3">Movie Name</th>
              <th className="px-3">Show Time</th>
              <th className="px-3">Total Booking</th>
              <th className="px-3">Earning</th>
            </tr>
          </thead>
          <tbody>
            {shows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No shows available
                </td>
              </tr>
            ) : (
              shows.map((show, index) => (
                <tr key={index}>
                  <td className="px-3">{show.movie?.title || "N/A"}</td>
                  <td className="px-3">{dateFormate(show.showDateTime)}</td>
                  <td className="px-3">
                    {show.occupiedSeats ? Object.keys(show.occupiedSeats).length : 0}
                  </td>
                  <td className="px-3">
                    {currency}{" "}
                    {show.occupiedSeats
                      ? Object.keys(show.occupiedSeats).length * show.showPrice
                      : 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListShows;
