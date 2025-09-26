// import React, { useState } from 'react'
// import BlueCircle from './BlueCircle'
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// const DateSelect = ({dateTime,id}) => {
//     const navigate=useNavigate()

//     const[selected,setselected]=useState(null)
//     const onBookHandler=()=>{
//         if(!selected){
//             return toast("please select a date")
//         }
//         navigate(`/movies/${id}/${selected}`)
//         scrollTo(0,0)
//     }
//   return (
//     <div id='dateSelect'className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
//         <BlueCircle top='100px' left='-100px'/>
//         <BlueCircle top='100px' right='0px'/>
//         <div>
//             <p className='text-lg font-semibold'>Choose Date</p>
//             <div className='flex items-center gap-6 text-sm mt-5'>
//                 <ChevronLeftIcon/>
//                 <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>{Object.keys(dateTime).map((date)=>(
//                     <button onClick={()=>setselected(data)} key={date} className={`flex flex-col items-center cursor-pointer justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selected===date ?"bg-primary text-white" :"border border-primary/70"}`}>
//                       <span>{new Date(date).getDate()}</span>
//                       <span>{new Date(date).toLocaleDateString("en-Us",{month:"short"})}</span>
//                     </button>
//                 ))}</span>
//                 <ChevronRightIcon width={28}/>
//             </div>
//             <button onClick={onBookHandler} className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'>Book Now</button>
//         </div>
//     </div>
//   )
// }

// export default DateSelect

// import React from "react";
// import BlueCircle from "./BlueCircle";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const DateSelect = ({ dateTime, id }) => {
//   return (
//     <div
//       id="dateSelect"
//       className="position-relative p-4 mt-5 border rounded"
//       style={{
//         backgroundColor: "rgba(13, 110, 253, 0.1)", // light blue bg
//         borderColor: "rgba(13, 110, 253, 0.3)",
//         color: "#f8f9fa",
//       }}
//     >
//       <BlueCircle top="50px" left="-60px" />
//       <BlueCircle top="50px" right="0px" />

//       <p className="fs-5 fw-semibold">Choose Date</p>

//       <div className="d-flex align-items-center gap-3 mt-3">
//         <ChevronLeft size={24} />

//         <div className="d-flex flex-wrap gap-3">
//           {Object.keys(dateTime).map((date) => (
//             <button
//               key={date}
//               className="btn btn-outline-light d-flex flex-column align-items-center"
//               style={{ minWidth: "60px" }}
//             >
//               <span>{new Date(date).getDate()}</span>
//               <span>
//                 {new Date(date).toLocaleDateString("en-US", {
//                   month: "short",
//                 })}
//               </span>
//             </button>
//           ))}
//         </div>

//         <ChevronRight size={24} />
//       </div>

//       <button className="btn btn-primary mt-4">Book Now</button>
//     </div>
//   );
// };

// export default DateSelect;

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
