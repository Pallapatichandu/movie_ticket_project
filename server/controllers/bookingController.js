

import Booking from "../models/Booking.js";
import Show from "../models/show.js";
import stripe from 'stripe'

// function to check availability of selected seats for a movie
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats || {};
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);

    return !isAnySeatTaken;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;


    // check if seats are available
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available",
      });
    }

    // get the show details
    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.json({ success: false, message: "Show not found" });
    }

    // update occupiedSeats
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = true;
    });

    // create booking
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    showData.markModified("occupiedSeats");
    await showData.save();
    //stripe Gateway Initialize
    const stripeInstance= new stripe(process.env.STRIPE_SECRET_KEY)
    //Create line items to for stripe
    const line_items=[{
      price_data:{
        currency:'usd',
        product_data:{
          name:showData.movie.title
        },
        unit_amount:Math.floor(booking.amount) *100
      },
      quantity:1
    }]
   const session = await stripeInstance.checkout.sessions.create({
  success_url: `${origin}/loading/my-bookings`,
  cancel_url: `${origin}/loading/my-bookings`,
  line_items: line_items,
  mode: 'payment',
  metadata: {
    bookingId: booking._id.toString(),
  },
  expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // ⚡ Correct parameter
});

    booking.paymentLink=session.url
    await booking.save()

    res.json({
      success: true,
      url: session.url
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get occupied seats for a show
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData) {
      return res.json({ success: false, message: "Show not found" });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats || {});
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
