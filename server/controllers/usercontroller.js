// import { clerkClient } from "@clerk/express";
// import Booking from "../models/Booking.js";
// import Movie from "../models/Movie.js";

// //API Controller function to Get User Bookings
// export const getUserBookings=async(req,res)=>{
//     try{
//         const user=req.auth().userId;
//         const bookings=await Booking.find({user}).populate({
//             path:"show",
//             populate:{path:'movie'}
//         }).sort({createAt:-1})
//         res.js({success:true,bookings})

//     }catch(error){
//      console.error(error);
//     res.json({ success: false, message: error.message });
//     }
// }

// //API controller Function to update Favorate movie in clerk user metadata
// export const UpdateFavorite=async(req,res)=>{
//     try {
//         const {movieId}=req.body
//         const userId=req.auth().userId;
//         const user=await clerkClient.users.getUser(userId)
//         if(!user.privateMetadata.favorites){
//             user.privateMetadata.favorites=[]

//         }
//         if(!user.privateMetadata.favorites.includes(movieId)){
//             user.privateMetadata.favorites.push(movieId)
//         }else{
//             user.privateMetadata.favorites.filter(item=>item !==movieId)
//         }
//         await clerkClient.users.updateUserMetadata(userId,{privateMetadata:user.privateMetadata})
//         res.json({success:true,message:"Favorite added successfully"})

        
//     } catch (error) {
//         console.error(error);
//     res.json({ success: false, message: error.message });
        
//     }
// }

// //

// export const getFavorites=async(req,res)=>{
//     try{
//         const user=await clerkClient.users.getUser(req.auth().userId)
//         const getUser=user.privateMetadata.favorites

//         //Getting movies from database
//         const movies=await Movie.find({_id:{$in:favorites}})
//         res.json({success:true,movies})

        
//     }catch(error){
//         res.json({ success: false, message: error.message });

//     }

// }

import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth.userId;
    const bookings = await Booking.find({ user })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Favorite Movies in Clerk Metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth.userId;

    const user = await clerkClient.users.getUser(userId);

    let favorites = user.privateMetadata.favorites || [];

    if (!favorites.includes(movieId)) {
      // add movie
      favorites.push(movieId);
    } else {
      // remove movie
      favorites = favorites.filter((id) => id !== movieId);
    }

    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: { ...user.privateMetadata, favorites },
    });

    res.json({ success: true, favorites });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get Favorite Movies
export const getFavorites = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    const favorites = user.privateMetadata.favorites || [];

    const movies = await Movie.find({ _id: { $in: favorites } });

    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
