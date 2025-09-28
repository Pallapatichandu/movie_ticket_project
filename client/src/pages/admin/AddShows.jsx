

import React, { useState, useEffect } from "react";
import Loading from "../../components/Loding";
import Tittle from "./Tittle";
import { CheckIcon, Trash2 as DeleteIcon, Star as StarIcon } from "lucide-react";
import { kConverter } from "../../lib/kConverter";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddShows = () => {
  const { axios, getToken, user,image_base_url } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const [nowplayingMovies, setNowplayingMovies] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const[addingShow,setAddingShow]=useState(false)

  // ✅ Fetch Now Playing Movies
  const fetchNowPlayingMovies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/show/now-playing", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setNowplayingMovies(data.movies);
      }
    } catch (error) {
      console.error("❌ Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit=async()=>{
    try {
       setAddingShow(true)
       if(!selectedMovie || Object.keys(dateTimeSelection).length ===0 || !showPrice){
        return toast('Missing required fields')
       }
       const showsInput=Object.entries(dateTimeSelection).map(([date,time])=>({date,time}))
       const payload={
        movieId:selectedMovie,
        showsInput,
        showPrice:Number(showPrice)
       }
       const{data}=await axios.post('/api/show/add',payload,{headers:{Authorization:`Bearer ${await getToken()}`}})
       if(data.success){
        toast.success(data.message)
        setSelectedMovie(null)
        setDateTimeSelection({})
        setShowPrice("")
       }else{
        toast.error(data.message)
       }
      
    } catch (error) {
      console.error("submission error",error)
      toast.error('An error occured.please try again')
      
    }
    setAddingShow(false)

  }

  useEffect(() => {
    if(user){

      fetchNowPlayingMovies();
    }
  }, [user]);

  // ✅ Add Date-Time
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

  // ✅ Remove Date-Time
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

  // ✅ Loading Spinner
  if (loading) return <Loading />;

  return (
    <>
      <Tittle text1="Add" text2="Shows" />

      {/* Now Playing Movies */}
      <p className="mt-4 h5">Now Playing Movies</p>
      <div className="d-flex flex-wrap gap-4 mt-3">
        {nowplayingMovies.map((movie) => (
          <div
            key={movie.id}
            className="card position-relative shadow-sm"
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
                src={image_base_url + movie.poster_path}
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
                <div
                  className="position-absolute top-0 end-0 m-2 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "24px", height: "24px" }}
                >
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
          <button onClick={handleDateTimeAdd} className="btn btn-primary">
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
                        className="ms-2 text-danger"
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
      <button className="btn btn-primary mt-4" disabled={addingShow} onClick={handleSubmit}>Save Show</button>
    </>
  );
};

export default AddShows;

