// import React, { useEffect, useState } from 'react'
// import {useNavigate, useParams} from  'react-router-dom'
// import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
// import BlueCircle from '../components/BlueCircle'
// import { Heart, PlayIcon, StarIcon } from 'lucide-react'
// import DateSelect from '../components/DateSelect'
// import MovieCard from '../components/MovieCard'
// import Loding from '../components/Loding'

// const MovieDetails = () => {
//   const navigate=useNavigate()
//   const{id}=useParams()
//   const[show,setShow]=useState(null)
//   const getShow=async()=>{
//     const show=dummyShowsData.find(show=>show._id===id)
//     if(show){
//       setShow(
//         {
//           movie:show,
//           dataTime:dummyDateTimeData
//         }
//       )

//     }
//   }
//   useEffect(()=>{
//    getShow()
//   },[id])
//   return show ? (
//     <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50 '>
//     <div className='flex flex-col md:flex-row gap-8 max-w-6wl mx-auto'>
      
//     <img src={show.movie.poster_path} alt="" className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover' />
//     <div className='relative flex flex-col gap-3'>
//       <BlueCircle top='-100px' left='-100px'/>
//       <p className='text-primary'>ENGLISH</p>
//       <h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>
//       <div className='flex item-center gap-2 text-gray-3000'>
//       <StarIcon className='w-5 h-5 text-primary fill-primary'/>
//       {show.movie.MovieDetailste_average.toFixed(1)} user Rating
//       </div>
//       <p className='tetx-gray-400 mt-2 text-5m leading-tight max-w-xl '>{show.movie.overview}</p>
//       <p>
//         {timeFormat(show.movie.runtime)} . {show.movie.genres.map(genre=>genre.name).join(",")}.{show.movie.release_date.split("-")[0]}
//       </p>
//       <div className='flex items-center flex-wrap gap-4 mt-4'>
        
//         <button className='flex items-center flex-wrap gap-2 px-7 py-3 text-sm bg-gray--800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scle-95'><PlayIcon className='w-5 h-5'/>Watch Trailer</button>
//         <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>
//         <button className='bg-gray-700 p-2.5 rounded-full transtion cursor-pointer active:scale-95'>
//           <Heart className={`w-5 h-5`}/>
//         </button>
//       </div>

//     </div>
//     </div>
//     <p>Your Favorite cast</p>
//     <div className='overflow-x-auto no-scollbar mt-8 pb-4'>
//       <div className='flex items-center gap-4 w-max px-4'>
//        {show.movie.casts.slice(0,12).map((cast,index)=>
//       <div key={index} className='flex flex-col items-center text-center'>
//         <img src={cast.profile_path} alt="" className='rounded-fill h-20 md:h-20 aspect -square object-cover' />
//         <p className='font-medium text-xs mt-3'>{cast.name}</p>
//       </div>
//       )}
//       </div>


//     </div>
//     <DateSelect dateTime={show.dataTime} id={id}/>
//     <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
//     <div className='flex flex-wrap max-sm:justify-center gap-8'>
//       {
//         dummyShowsData.slice(0,4).map((movie,inde)=>(
//           <MovieCard key={index} movie={movie}/>
//         ))
//       }

//     </div>
//     <div className='flex justify-center mt-20'>
//       <button onClick={()=>{navigate('/movies');scrollTo(0,0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>

//     </div>
//     </div>
//   ):<div>
//     <Loding/>
//   </div>
// }

// export default MovieDetails

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
// import { Heart, Play, Star } from "lucide-react";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [show, setShow] = useState(null);

//   const getShow = async () => {
//     const show = dummyShowsData.find((show) => show._id === id);
//     setShow({
//       movie: show,
//       dataTime: dummyDateTimeData,
//     });
//   };

//   useEffect(() => {
//     getShow();
//   }, [id]);

//   const timeFormat = (runtime) => {
//     const hrs = Math.floor(runtime / 60);
//     const mins = runtime % 60;
//     return `${hrs}h ${mins}m`;
//   };

//   if (!show) return <div className="text-center py-5 text-light">Loading...</div>;

//   return (
//     <div
//       className="py-5"
//       style={{
//         backgroundColor: "#0d1b2a", // full page dark background
//         minHeight: "100vh",
//         color: "#f8f9fa", // default light text
//       }}
//     >
//       <div className="container">
//         <div className="row g-4 align-items-start mt-5">
//           {/* Poster */}
//           <div className="col-md-4 text-center">
//             <img
//               src={show.movie.poster_path}
//               alt={show.movie.title}
//               className="img-fluid rounded shadow"
//               style={{ maxHeight: "420px", objectFit: "cover" }}
//             />
//           </div>

//           {/* Movie Details */}
//           <div className="col-md-8">
//             <span className="badge bg-primary mb-2">ENGLISH</span>
//             <h1 className="display-5 fw-bold">{show.movie.title}</h1>

//             <div className="d-flex align-items-center mb-2">
//               <Star size={20} className="text-warning me-2" />
//               <span style={{ color: "#e0e0e0" }}>
//                 {show.movie.vote_average.toFixed(1)} user Rating
//               </span>
//             </div>

//             <p style={{ color: "#cfd8dc" }}>{show.movie.overview}</p>

//             <p style={{ color: "#b0bec5" }}>
//               {timeFormat(show.movie.runtime)} ·{" "}
//               {show.movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
//               {show.movie.release_date.split("-")[0]}
//             </p>

//             {/* Buttons */}
//             <div className="d-flex flex-wrap gap-3 mt-4">
//               <button className="btn btn-dark d-flex align-items-center gap-2">
//                 <Play size={18} /> Watch Trailer
//               </button>

//               <a href="#dateSelect" className="btn btn-primary fw-medium px-4">
//                 Buy Tickets
//               </a>

//               <button className="btn btn-outline-danger rounded-circle p-2">
//                 <Heart size={20} className="text-danger" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cast Section */}
//         <div className="mt-5">
//           <h2 className="h5 mb-3 text-light">Your Favorite Cast</h2>
//           <div className="d-flex overflow-auto pb-3" style={{ gap: "1.5rem" }}>
//             {show.movie.casts.slice(0, 12).map((cast, index) => (
//               <div
//                 key={index}
//                 className="text-center"
//                 style={{ minWidth: "80px" }}
//               >
//                 <img
//                   src={cast.profile_path}
//                   alt={cast.name}
//                   className="rounded-circle shadow"
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     objectFit: "cover",
//                   }}
//                 />
//                 <p className="mt-2 small fw-medium" style={{ color: "#eceff1" }}>
//                   {cast.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
// import BlueCircle from "../components/BlueCircle";
// import { Heart, Play, Star } from "lucide-react";
// import DateSelect from "../components/DateSelect";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [show, setShow] = useState(null);

//   const getShow = async () => {
//     const show = dummyShowsData.find((show) => show._id === id);
//     setShow({
//       movie: show,
//       dataTime: dummyDateTimeData,
//     });
//   };

//   useEffect(() => {
//     getShow();
//   }, [id]);

//   const timeFormat = (runtime) => {
//     const hrs = Math.floor(runtime / 60);
//     const mins = runtime % 60;
//     return `${hrs}h ${mins}m`;
//   };

//   if (!show) return <div className="text-center py-5 text-light">Loading...</div>;

//   return (
//     <div
//       className="container py-5"
//       style={{ backgroundColor: "#0d1b2a", minHeight: "100vh", color: "#f8f9fa" }}
//     >
//       <div className="row g-4 align-items-start">
//         {/* Poster */}
//         <div className="col-md-4 text-center">
//           <img
//             src={show.movie.poster_path}
//             alt={show.movie.title}
//             className="img-fluid rounded shadow"
//             style={{ maxHeight: "420px", objectFit: "cover" }}
//           />
//         </div>

//         {/* Movie Details */}
//         <div className="col-md-8 position-relative">
//           <BlueCircle top="-80px" left="-80px" />
//           <span className="badge bg-primary mb-2">ENGLISH</span>
//           <h1 className="display-5 fw-bold">{show.movie.title}</h1>

//           <div className="d-flex align-items-center mb-2">
//             <Star size={20} className="text-warning me-2" />
//             <span>{show.movie.vote_average.toFixed(1)} user Rating</span>
//           </div>

//           <p className="text-light">{show.movie.overview}</p>

//           <p className="text-muted">
//             {timeFormat(show.movie.runtime)} ·{" "}
//             {show.movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
//             {show.movie.release_date.split("-")[0]}
//           </p>

//           {/* Buttons */}
//           <div className="d-flex flex-wrap gap-3 mt-4">
//             <button className="btn btn-dark d-flex align-items-center gap-2">
//               <Play size={18} /> Watch Trailer
//             </button>
//             <a href="#dateSelect" className="btn btn-primary px-4">
//               Buy Tickets
//             </a>
//             <button className="btn btn-outline-danger rounded-circle p-2">
//               <Heart size={20} className="text-danger" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Cast Section */}
//       <div className="mt-5">
//         <h2 className="h5 mb-3">Your Favorite Cast</h2>
//         <div className="d-flex overflow-auto pb-3" style={{ gap: "1.5rem" }}>
//           {show.movie.casts.slice(0, 12).map((cast, index) => (
//             <div
//               key={index}
//               className="text-center"
//               style={{ minWidth: "80px" }}
//             >
//               <img
//                 src={cast.profile_path}
//                 alt={cast.name}
//                 className="rounded-circle shadow"
//                 style={{ width: "80px", height: "80px", objectFit: "cover" }}
//               />
//               <p className="mt-2 small fw-medium">{cast.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Date Selector */}
//       <DateSelect dateTime={show.dataTime} id={id} />
//     </div>
//   );
// };

// export default MovieDetails;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlueCircle from "../components/BlueCircle";
import { Heart, Play, Star } from "lucide-react";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loding from "../components/Loding";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const movie = dummyShowsData.find((show) => show._id === id);
    if (movie) {
      setShow({
        movie: movie,
        dataTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  const timeFormat = (runtime) => {
    const hrs = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hrs}h ${mins}m`;
  };

  if (!show) return <Loding />;

  return (
    <div
      className="container-fluid py-5 position-relative"
      style={{ backgroundColor: "#0d1b2a", minHeight: "100vh", color: "#ffffff" }}
    >
      {/* Blur Background Circles */}
      <BlueCircle top="-100px" left="-100px" />
      <BlueCircle bottom="-100px" right="0px" />

      <div className="container">
        <div className="row g-4 align-items-start mt-4">
          {/* Poster */}
          <div className="col-md-4 text-center">
            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "420px", objectFit: "cover" }}
            />
          </div>

          {/* Movie Details */}
          <div className="col-md-8">
            <span className="badge bg-primary mb-2">ENGLISH</span>
            <h1 className="display-5 fw-bold text-white">{show.movie.title}</h1>

            <div className="d-flex align-items-center mb-2">
              <Star size={20} className="text-warning me-2" />
              <span className="text-light">
                {show.movie.vote_average?.toFixed(1)} User Rating
              </span>
            </div>

            <p className="text-light">{show.movie.overview}</p>

            <p className="text-light fw-semibold">
              {timeFormat(show.movie.runtime)} ·{" "}
              {show.movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
              {show.movie.release_date.split("-")[0]}
            </p>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mt-4">
              <button className="btn btn-dark d-flex align-items-center gap-2">
                <Play size={18} /> Watch Trailer
              </button>

              <a href="#dateSelect" className="btn btn-primary fw-medium px-4">
                Buy Tickets
              </a>

              <button className="btn btn-outline-danger rounded-circle p-2">
                <Heart size={20} className="text-danger fill-danger" />
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-5">
          <h2 className="h5 mb-3 text-white">Your Favorite Cast</h2>
          <div
            className="d-flex overflow-auto pb-3"
            style={{ gap: "1.5rem" }}
          >
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div
                key={index}
                className="text-center"
                style={{ minWidth: "80px" }}
              >
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="rounded-circle shadow"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <p className="mt-2 small fw-medium text-light">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <DateSelect dateTime={show.dataTime} id={id} />

        {/* Recommendations */}
        <p className="fs-5 fw-semibold mt-5 mb-4 text-white">You May Also Like</p>
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {dummyShowsData.slice(0, 4).map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={() => {
              navigate("/movies");
              window.scrollTo(0, 0);
            }}
            className="btn btn-primary px-5 py-2"
          >
            Show More
          </button>
        </div>
      </div>

      {/* Extra Styling for DateSelect Hover */}
      <style>
        {`
          #dateSelect .btn {
            background-color: #1b263b;
            color: #ffffff;
            border: 1px solid #415a77;
            transition: all 0.3s ease-in-out;
          }
          #dateSelect .btn:hover {
            background-color: #e63946;
            border-color: #e63946;
            color: #ffffff;
          }
        `}
      </style>
    </div>
  );
};

export default MovieDetails;
