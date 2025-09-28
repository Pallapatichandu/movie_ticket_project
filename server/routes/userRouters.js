// import express from "express"
// import { getFavorites, getUserBookings, UpdateFavorite } from "../controllers/usercontroller.js"
// const userRouter=express.Router()
// userRouter.get('/bookings',getUserBookings)
// userRouter.post('/update-favorite',UpdateFavorite)
// userRouter.get('favorites',getFavorites)

// export default userRouter


import express from "express";
import { getFavorites, getUserBookings, updateFavorite } from "../controllers/usercontroller.js";

const userRouter = express.Router();

// Get user bookings
userRouter.get("/bookings", getUserBookings);

// Update favorite movies
userRouter.post("/update-favorite", updateFavorite);

// Get favorite movies
userRouter.get("/favorites", getFavorites);

export default userRouter;

