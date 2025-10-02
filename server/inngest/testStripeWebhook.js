// testStripeWebhook.js
import "dotenv/config"; // loads .env automatically
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Show from "../models/show.js";
import Stripe from "stripe";
import { stripeWebhook } from "../controllers/stripeWebhooks.js";

// -------------------- STRIPE SETUP --------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -------------------- MONGODB CONNECTION --------------------
await mongoose.connect(process.env.MONGODB_URI); // Use correct env variable
console.log("✅ Connected to MongoDB");

// -------------------- TEST WEBHOOK --------------------

// Replace with a valid booking ID from your DB
const bookingId = "YOUR_BOOKING_ID_HERE";

const fakeEvent = {
  headers: {
    "stripe-signature": "fake-signature", // for testing, signature verification will fail
  },
  body: JSON.stringify({
    type: "checkout.session.completed",
    data: {
      object: {
        metadata: { bookingId },
      },
    },
  }),
};

// Mock request and response objects
const fakeReq = {
  headers: fakeEvent.headers,
  body: fakeEvent.body,
};

const fakeRes = {
  json: (data) => console.log("Response:", data),
  status: (code) => ({
    send: (msg) => console.log(`Status ${code}: ${msg}`),
  }),
};

// -------------------- RUN WEBHOOK --------------------
try {
  await stripeWebhook(fakeReq, fakeRes);
  console.log("✅ Test webhook finished");
} catch (err) {
  console.error("❌ Test webhook error:", err.message);
}

process.exit();
