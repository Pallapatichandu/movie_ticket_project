// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
// import Loading from '../components/Loding'
// import { ArrowRightIcon, ClockIcon } from 'lucide-react'
// import isoTimeFormat from '../lib/isoTimeformat'
// import BlueCircle from '../components/BlueCircle'
// import toast from 'react-hot-toast'

// const SeatLayout = () => {
//   const groupRows=[["A","B"],["C","D"],["E","F"],["G","H"],["I","j"]]
//   const{id,date}=useParams()
//   const [selectedSeats,setselectedSeats]=useState([])
//   const [selectedTime,setselectedTime]=useState(null)
//   const [show,setShow]=useState(null)
//   const navigate=useNavigate()
//   const getShow=async()=>{
//     const show=dummyShowsData.find(show=>show._id===id)
//     if(show){
//       setShow({
//         movie:show,
//         dateTime:dummyDateTimeData
//       })
//     }
//   }
//   const handleSeatClick=(seatId)=>{
//     if(!selectedTime){
//       return toast("please select time first")
//     }
//     if(!selectedSeats.includes(seatId) && selectedSeats.length>4){
//       return toast("You can only select 5 seates")
//     }
//     setselectedSeats(prev=>prev.includes(seatId) ?prev.filter(seat=>seat !==seatId):[...prev,seatId])

//   }
//   const renderSeats=(row,count=9)=>{
//     <div key={row} className='flex gap-2'>
//       <div className='flex-wrap items-center justify-center gap-2 '>
//         {
//           Array.from({length:count},(_,i)=>{
//             const seatId=`${row}${i+1}`
//             return(
//             <button key={seatId} onClick={()=>handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>{seatId}</button>

//             )
//           })
//         }

//       </div>

//     </div>

//   }
//   useEffect(()=>{
//     getShow()

//   },[])
//   return show ? (
//     <div className='flex flex-col md:flex-row px-16 md:px-16 lg:px-40 py-30 md:pt-50'>
//   {/* {available Timings} */}
//   <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
//   <p className='text-lg font-semibold px-6'>Available Timings</p>
//   <div className='mt-5 space-y-1'>
//     {show.dateTime[date].map(item=>
//       <div key={item.time} onClick={()=>setselectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${setselectedTime?.time===item.time?"bg-primary text-white":"hover:gb-primary/20"}`}>
//         <ClockIcon className='w-4 h-4'/>
//         <p>{isoTimeFormat(item.item)}</p>
//       </div>
//     )}
//   </div>

//   </div>
//   {/* {seat Layout} */}
//   <div className='realtive flex-1 flex flex-col item-center max-md:mt-16'>
//     <BlueCircle top='-100px' left='-100px'/>
//     <BlueCircle bottom='0' right='0'/>
//     <h1 className='text-2xl font-semibold mb-4'></h1>
//     <img src={assets.screenImage} alt="screen" />
//     <p className='tex-gray-400 text-5m mb-6'>SCREEN SIDE</p>
//     <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
//       <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6 '>
//         {groupRows[0].map(row=>renderSeats(row))}
//       </div>
//       <div className='grid grid-cols-2 gap-11'>
//         {
//           groupRows.slice(1).map((group,idx)=>(
//             <div key={inx}>
//               {group.map(row=>renderSeats(row))}
//             </div>
//           ))
//         }

//       </div>

//     </div>
//     <button onClick={()=>navigate("/my-bookings")} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>Proceed to Checkout
//       <ArrowRightIcon strokeWidth={3} className='w-4 h-4'/>
//     </button>
//   </div>
//     </div>
//   ):(
//     <Loading/>
//   )
// }

// export default SeatLayout



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
// import Loading from "../components/Loding";
// import { ArrowRightIcon, ClockIcon } from "lucide-react";
// import isoTimeFormat from "../lib/isoTimeformat";
// import BlueCircle from "../components/BlueCircle";
// import toast from "react-hot-toast";

// const SeatLayout = () => {
//   const groupRows = [
//     ["A", "B"],
//     ["C", "D"],
//     ["E", "F"],
//     ["G", "H"],
//     ["I", "J"],
//   ];
//   const { id, date } = useParams();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [show, setShow] = useState(null);
//   const navigate = useNavigate();

//   const getShow = async () => {
//     const show = dummyShowsData.find((show) => show._id === id);
//     if (show) {
//       setShow({
//         movie: show,
//         dateTime: dummyDateTimeData,
//       });
//     }
//   };

//   const handleSeatClick = (seatId) => {
//     if (!selectedTime) {
//       return toast("Please select time first");
//     }
//     if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
//       return toast("You can only select 5 seats");
//     }
//     setSelectedSeats((prev) =>
//       prev.includes(seatId)
//         ? prev.filter((seat) => seat !== seatId)
//         : [...prev, seatId]
//     );
//   };

//   const renderSeats = (row, count = 9) => (
//     <div key={row} className="d-flex flex-wrap justify-content-center gap-2 mb-2">
//       {Array.from({ length: count }, (_, i) => {
//         const seatId = `${row}${i + 1}`;
//         return (
//           <button
//             key={seatId}
//             onClick={() => handleSeatClick(seatId)}
//             className={`btn btn-sm rounded ${
//               selectedSeats.includes(seatId)
//                 ? "btn-primary text-white"
//                 : "btn-outline-secondary"
//             }`}
//             style={{ width: "40px", height: "40px", fontSize: "12px" }}
//           >
//             {seatId}
//           </button>
//         );
//       })}
//     </div>
//   );

//   useEffect(() => {
//     getShow();
//   }, []);

//   if (!show) return <Loading />;

//   const timings = show.dateTime[date] || [];

//   return (
//     <div className="container-fluid py-5 d-flex flex-column flex-md-row position-relative text-light">
//       {/* Blur Circles */}
//       <BlueCircle top="-100px" left="-100px" />
//       <BlueCircle bottom="0" right="0" />

//       {/* Timings Sidebar */}
//       <div className="col-md-3 bg-dark bg-opacity-50 border border-primary rounded p-4 h-max sticky-md-top">
//         <p className="h5 fw-semibold mb-3">Available Timings</p>
//         <div className="d-flex flex-column gap-2">
//           {timings.length > 0 ? (
//             timings.map((item) => (
//               <div
//                 key={item.time}
//                 onClick={() => setSelectedTime(item)}
//                 className={`d-flex align-items-center gap-2 px-3 py-2 rounded cursor-pointer ${
//                   selectedTime?.time === item.time
//                     ? "bg-primary text-white"
//                     : "border border-primary"
//                 }`}
//                 style={{ width: "fit-content", cursor: "pointer" }}
//               >
//                 <ClockIcon size={16} />
//                 <p className="mb-0">{isoTimeFormat(item.time)}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-secondary small">No timings available</p>
//           )}
//         </div>
//       </div>

//       {/* Seat Layout */}
//       <div className="col-md-9 d-flex flex-column align-items-center mt-5 mt-md-0">
//         <h2 className="mb-4">Select Your Seats</h2>
//         <img
//           src={assets.screenImage}
//           alt="screen"
//           className="img-fluid mb-2"
//           style={{ maxWidth: "400px" }}
//         />
//         <p className="text-secondary small mb-4">SCREEN SIDE</p>

//         <div className="d-flex flex-column align-items-center mt-3">
//           {/* First Row Group */}
//           <div className="d-grid gap-4 mb-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
//             {groupRows[0].map((row) => renderSeats(row))}
//           </div>

//           {/* Other Row Groups */}
//           <div className="d-grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
//             {groupRows.slice(1).map((group, idx) => (
//               <div key={idx} className="d-flex flex-column gap-2">
//                 {group.map((row) => renderSeats(row))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Checkout Button */}
//         <button
//           onClick={() => navigate("/my-bookings")}
//           className="btn btn-primary mt-5 d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
//         >
//           Proceed to Checkout
//           <ArrowRightIcon size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SeatLayout;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loding";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeformat";
import BlueCircle from "../components/BlueCircle";
import toast from "react-hot-toast";

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
  const navigate = useNavigate();

  const getShow = async () => {
    const movieShow = dummyShowsData.find((show) => show._id === id);
    if (movieShow) {
      setShow({
        movie: movieShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

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
                : "btn-outline-light"
            }`}
            style={{ width: "40px", height: "40px", fontSize: "12px" }}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );

  useEffect(() => {
    getShow();
  }, []);

  if (!show) return <Loading />;

  const timings = show.dateTime[date] || [];

  return (
    <div
      className="container-fluid py-5 d-flex flex-column flex-md-row position-relative text-light mt-5"
      style={{ backgroundColor: "rgba(13, 27, 42, 0.95)", minHeight: "100vh" }}
    >
      {/* Blur Circles (all corners) */}
      <BlueCircle top="-120px" left="-120px" />
      <BlueCircle top="-120px" right="-120px" />
      <BlueCircle bottom="-120px" left="-120px" />
      <BlueCircle bottom="-120px" right="-120px" />

      {/* Available Timings */}
      <div className="col-md-3 bg-dark bg-opacity-50 border border-primary rounded p-4 sticky-md-top mt-5" >
        <p className="h5 fw-semibold">Available Timings</p>
        <div className="mt-3">
          {timings.length > 0 ? (
            timings.map((item) => (
              <div
                key={item.time}
                onClick={() => setSelectedTime(item)}
                className={`d-flex align-items-center gap-2 px-3 py-2 rounded mb-2 cursor-pointer ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "border border-primary"
                }`}
                style={{ width: "fit-content" }}
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
      <div className="col-md-9 d-flex flex-column align-items-center mt-5 mt-md-0 position-relative ">
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
          <div
            className="d-grid gap-4"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx} className="d-flex flex-column gap-3">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="btn btn-primary mt-5 d-flex align-items-center gap-2 px-4 py-2 fw-semibold"
        >
          Proceed to Checkout
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
