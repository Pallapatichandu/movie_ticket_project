// import React, { useEffect, useState } from 'react'
// import { dummyBookingData } from '../../assets/assets';

// import Tittle from './Tittle';
// import Loading from '../../components/Loding';
// import dateFormate from '../../lib/dateFormat';

// const ListBookings = () => {
//    const currency = import.meta.env.VITE_CURRENCY;
//    const [booking,setBookings]=useState([])
//    const[isLoading,setIsLoading]=useState(true)
//    const getAllBookings=async()=>{
//     setBookings(dummyBookingData)
//     setIsLoading(false)
//    }
//    useEffect(()=>{
//     getAllBookings()
//    },[])
//   return !isLoading?(
//     <>
//     <Tittle text1="List" text2="Bookings"/>
    
//       <div className='max-w-4xl mt-6 overflow-X-auto'>
//       <table className='w-full border-collapse brounded-md overflow-hidden text-nowrap'>
//         <thead>
//           <tr className='bg-primary/20 text-left text-white'>
//           <th className='p-2 font-medium pl-5'>User Name</th>
//          <th className='p-2 font-medium pl-5'>Movie Name</th>
//          <th className='p-2 font-medium pl-5'>Show Time</th>
//          <th className='p-2 font-medium pl-5'>Amount</th>
//          </tr>
//         </thead>
//          <tbody>
//                   {
//                     bookings.map((item,index)=>(
//                       <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
//                         <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
//                         <td className='p-2'>{item.show.movie.title}</td>
//                         <td className='p-2'>{dateFormate(item.show.ShowsDateTime)}</td>
//                         <td className='p-2'>{Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]).join(", ")}</td>
//                         <td className='p-2'>{currency}  {item.amount}</td>
        
//                       </tr>
//                     ))
//                   }
//                 </tbody>
//         </table>
//     </div>
    
//     </>
//   ):<Loading/>
// }

// export default ListBookings

import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Tittle from "./Tittle";
import Loading from "../../components/Loding";
import dateFormate from "../../lib/dateFormat";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

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

