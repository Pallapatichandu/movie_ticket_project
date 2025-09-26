// import { ArrowRight } from 'lucide-react'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { dummyShowsData } from '../assets/assets'
// import MovieCard from './MovieCard'

// const FeatureSection = () => {
//     const navigate=useNavigate()
//   return (
//     <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
//         <div className='relative flex items-center justify-between pt-20 pb-10'>
//             <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
//             <button onClick={()=>navigate("/movies")} className='group flex items-center gap-2 text-sm text-gray-300'>
//                 view All
//                 <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5'/>
//             </button>
//         </div>
//         <div className='flex flex-wrap mx-sn:justify-center gap-8 mt-8'>
//             {
//                 dummyShowsData.slice(0,4).map((show)=>(
//                     <MovieCard key={show._id} movie={show}/>

//                 ))
//             }
//         </div>
//         <div className='flex justify-center mt-20'>
//             <button onClick={()=>{navigate('/movies');scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary-dull transition rounded-md font-medium cursor-pointer'>
//              Show more
//             </button>

//         </div>

//     </div>
//   )
// }

// export default FeatureSection


// import { ArrowRight } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import BlueCircle from "./BlueCircle";
// import { dummyShowsData } from "../assets/assets";
// import MovieCard from "./MovieCard";

// const FeatureSection = () => {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="container-fluid px-3 px-md-4 px-lg-5 px-xl-5 overflow-hidden position-relative"
//       style={{ backgroundColor: "rgb(18, 18, 18)" }}
//     >
//       {/* Blue Glow Circle */}
//       <BlueCircle top="0" right="-80px" />

//       {/* Header Row */}
//       <div className="d-flex justify-content-between align-items-center pt-5 pb-3">
//         <p
//           className="mb-0"
//           style={{ color: "#d1d5db", fontWeight: 500, fontSize: "1rem" }}
//         >
//           Now Showing
//         </p>

//         <button
//           type="button"
//           onClick={() => navigate("/movies")}
//           className="btn d-flex align-items-center p-0 view-all-btn"
//           style={{ color: "white" }}
//         >
//           View All
//           <ArrowRight size={18} className="ms-1 transition-arrow" />
//         </button>
//       </div>

//       {/* Movies Grid */}
//       <div className="row g-4 mt-4 justify-content-center">
//         {dummyShowsData.slice(0, 4).map((shows) => (
//           <div key={shows._id} className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
//             <MovieCard movie={shows} />
//           </div>
//         ))}
//       </div>

//       {/* Extra Styling */}
//       <style>
//         {`
//           .view-all-btn {
//             font-size: 0.85rem;
//             background: none;
//             border: none;
//             cursor: pointer;
//           }

//           .view-all-btn:hover .transition-arrow {
//             transform: translateX(2px);
//             transition: transform 0.2s ease-in-out;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default FeatureSection;

// import { ArrowRight } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { dummyShowsData } from "../assets/assets";
// import MovieCard from "./MovieCard";

// const FeatureSection = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="px-3 px-md-4 px-lg-5 px-xl-5 overflow-hidden">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center pt-5 pb-4">
//         <p className="text-secondary mb-0 fw-medium fs-6">Now Showing</p>

//         <button
//           type="button"
//           onClick={() => navigate("/movies")}
//           className="btn btn-link p-0 text-decoration-none d-flex align-items-center text-secondary"
//         >
//           View All
//           <ArrowRight size={18} className="ms-2" />
//         </button>
//       </div>

//       {/* Movie Cards */}
//       <div className="row g-4 mt-3">
//         {dummyShowsData.slice(0, 4).map((show) => (
//           <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={show._id}>
//             <MovieCard movie={show} />
//           </div>
//         ))}
//       </div>

//       {/* Show More Button */}
//       <div className="d-flex justify-content-center mt-5">
//         <button
//           type="button"
//           onClick={() => {
//             navigate("/movies");
//             window.scrollTo(0, 0);
//           }}
//           className="btn btn-primary px-4 py-2 rounded fw-medium"
//         >
//           Show More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FeatureSection;

import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import BlueCircle from "./BlueCircle";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid px-3 px-md-4 px-lg-5 px-xl-5 overflow-hidden position-relative"
      style={{ backgroundColor: "rgb(18, 18, 18)" }}
    >
      {/* Blue Glow Circle */}
      <BlueCircle top="0" right="-80px" />

      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center pt-5 pb-3">
        <p
          className="mb-0"
          style={{ color: "#d1d5db", fontWeight: 500, fontSize: "1rem" }}
        >
          Now Showing
        </p>

        <button
          type="button"
          onClick={() => navigate("/movies")}
          className="btn d-flex align-items-center p-0 view-all-btn"
          style={{ color: "white" }}
        >
          View All
          <ArrowRight size={18} className="ms-1 transition-arrow" />
        </button>
      </div>

      {/* Movies Grid */}
      <div className="row g-4 mt-4 justify-content-center">
        {dummyShowsData.slice(0, 4).map((shows) => (
          <div
            key={shows._id}
            className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
          >
            <MovieCard movie={shows} />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          onClick={() => {
            navigate("/movies");
            window.scrollTo(0, 0);
          }}
          className="btn btn-primary px-4 py-2 fw-medium rounded"
        >
          Show More
        </button>
      </div>

      {/* Extra Styling */}
      <style>
        {`
          .view-all-btn {
            font-size: 0.85rem;
            background: none;
            border: none;
            cursor: pointer;
          }

          .view-all-btn:hover .transition-arrow {
            transform: translateX(2px);
            transition: transform 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default FeatureSection;


