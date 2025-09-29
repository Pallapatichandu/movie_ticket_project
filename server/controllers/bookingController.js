

import Booking from "../models/Booking.js";
import Show from "../models/show.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Check seat availability
const checkSeatsAvailability = async (showId, selectedSeats) => {
  const showData = await Show.findById(showId);
  if (!showData) return false;

  const occupiedSeats = showData.occupiedSeats || {};
  const taken = selectedSeats.some(seat => occupiedSeats[seat]);
  return !taken;
};

// Create Booking & Stripe Checkout Session
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth(); // assuming auth middleware
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    const available = await checkSeatsAvailability(showId, selectedSeats);
    if (!available) return res.json({ success: false, message: "Seats not available" });

    const showData = await Show.findById(showId).populate("movie");
    if (!showData) return res.json({ success: false, message: "Show not found" });

    selectedSeats.forEach(seat => showData.occupiedSeats[seat] = true);

    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
      isPaid: false,
    });

    showData.markModified("occupiedSeats");
    await showData.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: showData.movie.title },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/loading/my-bookings`,
      metadata: { bookingId: booking._id.toString() },
    });

    booking.paymentLink = session.url;
    await booking.save();

    res.json({ success: true, url: session.url });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user bookings
export const getMyBookings = async (req, res) => {
  try {
    const { userId } = req.auth();
    const bookings = await Booking.find({ user: userId }).populate("show movie");
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, bookings: [] });
  }
};

// Get occupied seats for a show
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    const occupiedSeats = Object.keys(showData.occupiedSeats || {});
    res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.error(error);
    res.json({ success: false, occupiedSeats: [] });
  }
};
