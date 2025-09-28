import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/show.js";
//API to grt now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`, // must be Access Token, not plain API key
        },
      }
    );

    const movies = response.data.results;
    res.json({ success: true, movies });
  } catch (error) {
    console.error("TMDB Fetch Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to Add a new show to the database

export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    if (!movieId || !showsInput || !showPrice) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let movie = await Movie.findById(movieId);

    if (!movie) {
      // Fetch movie details and credits from TMDB
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
        }),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    // Prepare shows
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    res.json({ success: true, message: "Show added successfully." });
  } catch (error) {
    console.error("Add Show Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all upcoming shows (unique by movie)
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    // Get unique movies
    const uniqueShows = new Set(shows.map((s) => s.movie));
    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get a single movie with its upcoming shows
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    const shows = await Show.find({
      movie: String(movieId),   // ensure comparison with string
      showDateTime: { $gte: new Date() }
    });

    const movie = await Movie.findOne({ _id: String(movieId) }); // fixed

    const dateTime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie, shows: dateTime });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// import axios from "axios";
// import Movie from "../models/Movie.js";
// import Show from "../models/show.js";

// // API to get now playing movies from TMDB
// export const getNowPlayingMovies = async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
//         },
//       }
//     );

//     const movies = response.data.results;
//     res.json({ success: true, movies });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.response?.data?.status_message || error.message,
//     });
//   }
// };

// // API to Add a new show
// export const addShow = async (req, res) => {
//   try {
//     const { movieId, showsInput, showPrice } = req.body;

//     if (!movieId || !showsInput || !showPrice) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     let movie = await Movie.findOne({ tmdbId: movieId });

//     if (!movie) {
//       const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
//         axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
//           { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }
//         ),
//         axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
//           { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }
//         ),
//       ]);

//       const movieApiData = movieDetailsResponse.data;
//       const movieCreditsData = movieCreditsResponse.data;

//       const movieDetails = {
//         tmdbId: movieId,
//         title: movieApiData.title,
//         overview: movieApiData.overview,
//         poster_path: movieApiData.poster_path,
//         backdrop_path: movieApiData.backdrop_path,
//         genres: movieApiData.genres,
//         casts: movieCreditsData.cast,
//         release_date: movieApiData.release_date,
//         original_language: movieApiData.original_language,
//         tagline: movieApiData.tagline || "",
//         vote_average: movieApiData.vote_average,
//         runtime: movieApiData.runtime,
//       };

//       movie = await Movie.create(movieDetails);
//     }

//     const showsToCreate = [];
//     showsInput.forEach((show) => {
//       const showDate = show.date;
//       show.time.forEach((time) => {
//         const dateTimeString = `${showDate}T${time}`;
//         showsToCreate.push({
//           movie: movie._id,
//           showDateTime: new Date(dateTimeString),
//           showPrice,
//           occupiedSeats: {},
//         });
//       });
//     });

//     if (showsToCreate.length > 0) {
//       await Show.insertMany(showsToCreate);
//     }

//     res.json({ success: true, message: "Show added successfully." });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get all upcoming shows (unique by movie)
// export const getShows = async (req, res) => {
//   try {
//     const shows = await Show.find({ showDateTime: { $gte: new Date() } })
//       .populate("movie")
//       .sort({ showDateTime: 1 });

//     const uniqueMovies = {};
//     shows.forEach((s) => {
//       uniqueMovies[s.movie._id] = s.movie;
//     });

//     res.json({ success: true, shows: Object.values(uniqueMovies) });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// // Get a single movie with its upcoming shows
// export const getShow = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     const movie = await Movie.findOne({ tmdbId: movieId });
//     if (!movie) {
//       return res.json({ success: false, message: "Movie not found" });
//     }

//     const shows = await Show.find({
//       movie: movie._id,
//       showDateTime: { $gte: new Date() },
//     });

//     const dateTime = {};
//     shows.forEach((show) => {
//       const date = show.showDateTime.toISOString().split("T")[0];
//       if (!dateTime[date]) {
//         dateTime[date] = [];
//       }
//       dateTime[date].push({ time: show.showDateTime, showId: show._id });
//     });

//     res.json({ success: true, movie, shows: dateTime });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
