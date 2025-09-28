// import Booking from "../models/Booking.js"
// import Show from "../models/show.js"
// import User from "../models/User.js"

// //API to check if user is admin
// export const isAdmin=async(req,res)=>{
//     res.json({success:true,isAdmin:true})

// }
// //API to get dashbord data
// export const getDashbordData=async(req,res)=>{
//     try{

//         const bookings=await Booking.find({isPaid:true})
//         const activeShows=await Show.find({showDateTime:{$gte:new Date()}}).populate('movie')
//         const totalUser=await User.countDocuments()
//         const dashbordData={
//             totalBookings:bookings.length,
//             totalRevenu:bookings.reduce((acc,booking)=>acc + booking.amount,0),
//             activeShows,
//             totalUser
//         }
//         res.json({success:true,dashbordData})
//     }catch(error){
//         console.error(error)
//         res.json({success:false,message:error.message})
        

//     }


// }
// //Api to get all shows

// export const getAllShows=async(req,res)=>{
//     try{
//         const shows=await Show.find({showDateTime:{$get:new Date()}}).populate('movie').sort({showDateTime:1})


//      res.json({success:true,shows})
//     }catch(error){
//         console.error(error)
//         res.json({success:false,message:error.message})

//     }

// }

// //API to get All bookings
// export const getAllBookings=async(req,res)=>{
//     try{
//         const bookings=await Booking.find({}).populate('user').populate({
//             path:"show",
//             populate:{path:'movie'}
//         }).sort({createAt:-1})
//         res.json({success:true,bookings})

//     }catch(error){
//         console.error(error)
//         res.json({success:false,message:error.message})

//     }

// }

import Booking from "../models/Booking.js";
import Show from "../models/show.js";
import User from "../models/User.js";

// API to check if user is admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

// API to get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate("movie");
    const totalUsers = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount, 0),
      activeShows,
      totalUsers,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error("getDashboardData Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all upcoming shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error("getAllShows Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to get all bookings with user and movie info
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("getAllBookings Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
