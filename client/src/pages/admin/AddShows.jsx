// import React, { useState } from 'react'
// import { dummyShowsData } from '../../assets/assets';
// import Loading from '../../components/Loding';
// import Tittle from './Tittle';
// import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
// import { kConverter } from '../../lib/kConverter';

// const AddShows = () => {
//   const currency = import.meta.env.VITE_CURRENCY;
//   const[nowplayingMovies,setnowplayingMovies]=useState([])
//   const[selectedMovie,setselectedMovie]=useState(null)
//   const[dateTimeSelection,setateTimeSelection]=useState({})
//   const[dateTimeInput,setdateTimeInput]=useState("")
//   const[showPrice,setshowPrice]=useState("")
//   const fetchNowPlayingMovie=async()=>{
//     setnowplayingMovies(dummyShowsData)
//   }
//   const handleDateTimeAdd=()=>{
//     if(!dateTimeInput) return
//     const [date,time]=dateTimeInput.split("T")
//     if(!date || !time) return
//     setateTimeSelection((prev)=>{
//       const times=prev[date] || []
//       if(!times.includes(time)){
//         return {...prev,[date]:[...times,time]}
//       }
//       return prev
//     })
//   }
//   handleRemoveTime=(date,time)=>{
//     setateTimeSelection((prev)=>{
//       const filteredTimes=prev[date].filter((t)=>t!==time)
//       if(filteredTimes.length===0){
//         const {[date]:_,...rest}=prev
//         return rest
//       }
//       return{
//         ...prev,[date]:filteredTimes
//       }
//     })
//   }

//   return setnowplayingMovies.length>0 ? (
//     <>
//     <Tittle text1="Add" text2="Shows"/>
//     <p className='mt-10 text-lg font-medium '>Now playing Movies</p>
//     <div className='overflow-x-auto pb-4'>
//       <div className='group flex flex-wrap gap-4 mt-4 w-max'>
//         <div className='group flex flex-wrap gap-4 mt-4 w-max'>
//           {
//             nowplayingMovies.map((movie)=>(
//               <div key={movie.id} className={`relative max-w-40 cursor-pointer group-hover:not-hovr:opacity-40 hover:-translate-y-1 transition duration-300`} onClick={()=>selectedMovie(movie.id)}>
//                 <div className='relative rounded-lg overflow-hidden'>
//                   <img src={movie.poster_patgh} alt="" className='w-full object-cover brightness-90' />
//                   <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute buttom-0 left-0'>
//                   <p className='flex items-center gap-1 text-gray-400'>
//                     <StarIcon className='w-4 h-4 text-primary fill-primary'/>
//                     {movie.vote_average.toFixed(1)}
//                   </p>
//                   <p className='text-gray-300'>{kConverter(movie.vote_count)}votes</p>

//                   </div>

//                 </div>
//                 {selectedMovie===movie.id && (
//                   <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
//                     <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>

//                   </div>
//                 )}
//                  <p className='font-medium truncate'>{movie.title}</p>
//                  <p className='text-gray-400 text-sm'>{movie.release_date}</p>

//               </div>
              
//             ))
//           }

//         </div>

//       </div>

//     </div>
//     {/* {Show Price Input} */}
//     <div className='mt-8'>
//       <label className='black text-sm font-medium mb-2'>Show Price </label>
//       <div className='inlline-flex items-center gap-2 border border-gray-500 px-3 py-2 rounded md'>
//         <p className='text-gray-400 text-sm'>{currency}</p>
//         <input min={0} type="number" value={showPrice}  onChange={(e)=>setshowPrice(e.target.value)} placeholder='Enter show price' className='outline-none'/>

//       </div>

//     </div>
//     {/* {Date & Time} */}
//     <div className='mt-6'>
//       <label className='black text-sm font-medium mb-2'>Show Price </label>
//       <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3'>
//         <input type="datetime-local"  value={dateTimeInput} onChange={(e)=>setdateTimeInput(e.target.value)} className='outline-none rounded-md  '/>
//         <button onClick={handleDateTimeAdd} className='bg-primary/80 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer'>Add Time</button>
//       </div>

//     </div>
//     {/* {display select time} */}
//     {
//       Object.keys(dateTimeSelection).length > 0 &&(
//         <div className='mt-6'>
//           <h2 className='mb-2'>Selected Date-Time</h2>
//           <ul className='space-y-3'>
//             {
//               Object.entries(dateTimeSelection).map(([date,times])=>
//                 <li key={date}>
//                   <div className='font-medium'> {date}</div>
//                     <div className='flex flex-wrap gap-2 mt-1 text-sm'>
//                       {times.map((time)=>(
//                         <div key={time} className='border border-primary px-2 py-1 flex items-center rounder'>
//                           <span>{time}</span>
//                           <DeleteIcon onClick={()=>handleRemoveTime(date,time)} width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>

//                         </div>
//                       ))}

                   
//                   </div>
//                 </li>
//               )
//             }

//           </ul>

//         </div>
//       )
//     }
//     <button className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'></button>

//     </>
//   ):<Loading/>
// }

// export default AddShows

import React, { useState, useEffect } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loding";
import Tittle from "./Tittle";
import { CheckIcon, Trash2 as DeleteIcon, Star as StarIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowplayingMovies, setNowplayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  useEffect(() => {
    setNowplayingMovies(dummyShowsData);
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;
    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  };

  return nowplayingMovies.length > 0 ? (
    <>
      <Tittle text1="Add" text2="Shows" />

      {/* Now Playing Movies */}
      <p className="mt-4 h5">Now Playing Movies</p>
      <div className="d-flex flex-wrap gap-4 mt-3">
        {nowplayingMovies.map((movie) => (
          <div
            key={movie.id}
            className={`card position-relative shadow-sm`}
            style={{
              width: "10rem",
              cursor: "pointer",
              opacity: selectedMovie && selectedMovie !== movie.id ? 0.6 : 1,
              transition: "all 0.3s ease",
            }}
            onClick={() => setSelectedMovie(movie.id)}
          >
            <div className="position-relative">
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="card-img-top"
                style={{ objectFit: "cover", height: "220px" }}
              />
              <div className="d-flex justify-content-between align-items-center px-2 py-1 bg-dark bg-opacity-75 position-absolute bottom-0 start-0 w-100">
                <p className="text-light small mb-0 d-flex align-items-center gap-1">
                  <StarIcon size={14} className="text-warning" />
                  {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-secondary small mb-0">
                  {kConverter(movie.vote_count)} votes
                </p>
              </div>
              {selectedMovie === movie.id && (
                <div className="position-absolute top-0 end-0 m-2 bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                  <CheckIcon size={14} className="text-white" />
                </div>
              )}
            </div>
            <div className="card-body p-2">
              <h6 className="card-title text-truncate mb-1">{movie.title}</h6>
              <p className="text-muted small mb-0">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show Price Input */}
      <div className="mt-4">
        <label className="form-label">Show Price</label>
        <div className="input-group" style={{ maxWidth: "250px" }}>
          <span className="input-group-text">{currency}</span>
          <input
            type="number"
            className="form-control"
            min={0}
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
          />
        </div>
      </div>

      {/* Date & Time Picker */}
      <div className="mt-4">
        <label className="form-label">Add Show Time</label>
        <div className="d-flex gap-2 align-items-center">
          <input
            type="datetime-local"
            className="form-control"
            style={{ maxWidth: "250px" }}
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
          />
          <button
            onClick={handleDateTimeAdd}
            className="btn btn-primary"
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Display Selected Date-Time */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-4">
          <h6>Selected Date-Time</h6>
          <ul className="list-unstyled">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date} className="mb-2">
                <strong>{date}</strong>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary rounded px-2 py-1 d-flex align-items-center"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        size={16}
                        className="ms-2 text-danger cursor-pointer"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveTime(date, time)}
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button className="btn btn-primary mt-4">Save Show</button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShows;
