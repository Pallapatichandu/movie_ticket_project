// controllers/bookingController.js


import { inngest } from "../inngest/index.js";
import Booking from "../models/Booking.js";
import Show from "../models/show.js";
import Stripe from "stripe";



// Check seat availability
const checkSeatsAvailability = async (showId, selectedSeats) => {
  const showData = await Show.findById(showId);
  if (!showData) return false;

  const occupiedSeats = showData.occupiedSeats || {};
  return !selectedSeats.some((seat) => occupiedSeats[seat]);
};

// Create Booking & Stripe Checkout Session
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth(); // ✅ Clerk fix
    if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });
    
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    // 1️⃣ Check seats availability
    const available = await checkSeatsAvailability(showId, selectedSeats);
    if (!available) {
      return res.status(400).json({ success: false, message: "Selected seats are not available" });
    }

    // 2️⃣ Fetch show details
    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.status(404).json({ success: false, message: "Show not found" });
    }

    // 3️⃣ Mark seats as occupied
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId; // or `true` if you only want a boolean
    });

    // 4️⃣ Create booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
      isPaid: false,
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    // 5️⃣ Create Stripe session
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    //creating line items to for strip
 const line_items=[{
  price_data:{
    currency:"usd",
    product_data:{
      name:showData.movie.title
    },
    unit_amount:Math.floor(booking.amount) * 100
  },
  quantity:1
 }]
 const session=await stripeInstance.checkout.sessions.create({
  success_url:`${origin}/loading/my-bookings`,
  cancel_url:`${origin}/my-bookings`,
  line_items:line_items,
  mode:'payment',
  metadata:{
    bookingId:booking._id.toString()
  },
  expires_at:Math.floor(Date.now()/1000)+30*60

 })
 booking.paymentLink=session.url
await booking.save();




res.json({success:true,url:session.url})


   
    
  } catch (error) {
    console.error("Error in createBooking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user bookings
export const getMyBookings = async (req, res) => {
  try {
    const { userId } = req.auth(); // ✅ Clerk fix
    const bookings = await Booking.find({ user: userId })
      .populate({ path: "show", populate: { path: "movie" } })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    console.error("Error in getMyBookings:", err);
    res.status(500).json({ success: false, bookings: [] });
  }
};

// Get occupied seats for a show
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData) {
      return res.status(404).json({ success: false, occupiedSeats: [] });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats || {});
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.error("Error in getOccupiedSeats:", error);
    res.status(500).json({ success: false, occupiedSeats: [] });
  }
};
