// import React, { useEffect, useState } from 'react'
// import { dummyBookingData } from '../assets/assets'
// import Loading from '../components/Loding'
// import BlueCircle from '../components/BlueCircle'
// import timeFormate from '../lib/timeFormat'
// import dateFormate from '../lib/dateFormat'

// const MyBookings = () => {
//   const currency=import.meta.env.VITE_CURRENCY
//   const [bookings,SetBookings]=useState([])
//   const [isLoading,setIsLoading]=useState(true)
//   const getMyBookings=async()=>{
//     SetBookings(dummyBookingData)
//     setIsLoading(false)
//   }
//   useEffect(()=>{
//     getMyBookings()
//   },[])
//   return !isLoading? (
//     <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80hv] '>
//       <BlueCircle top='100px left="100px'/>
//       <div>
//         <BlueCircle bottom='0px left="600px'/>
//       </div>
//       <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>
//       {bookings.map((item,index)=>(
//         <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
//         <div className='flex flex-col md:flex-row'>
//           <img src={item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
//           <div className='flex flex-col p-4'>
//           <p className='tex-lg font-semibold'>{item.show.movie.title}</p>
//           <p className='text-gray-400 text-sm'>{timeFormate(item.show.movie.runtime)}</p>
//            <p className='text-gray-400 text-sm mt-auto'>{dateFormate(item.show.showDateTime)}</p>

//         </div>
//         </div>
//         <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
//           <div className='flex items-center gap-4'>
//             <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
//             {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
//           </div>
//           <div className='text-sm'>
//             <p><span className='text-gray-400'>Total Tickets:{item.bookedSeats.length}</span></p>
//             <p><span className='text-gray-400'>Seat Number:{item.bookedSeats.join(",")}</span></p>
//           </div>

//         </div>
//         </div>
        
        
//       ))}
      
//     </div>
//   ):<Loading/>
// }

// export default MyBookings

import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";

import BlueCircle from "../components/BlueCircle";
import timeFormat from "../lib/timeFormat";
import dateFormat from "../lib/dateFormat";
import Loading from "../components/Loding";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

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
                src={item.show.movie.poster_path}
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
                    <button className="btn btn-primary btn-sm rounded-pill mb-3">
                      Pay Now
                    </button>
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



