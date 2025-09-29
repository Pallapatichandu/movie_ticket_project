import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/show.js"; // ✅ Import Show model
import sendEmail from "../configs/nodeMailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/* -------------------- Clerk → MongoDB Sync Functions -------------------- */

// 1. User Created
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  }
);

// 2. User Deleted
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// 3. User Updated
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.findByIdAndUpdate(id, {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  }
);

/* -------------------- Release Seats if Payment Not Done -------------------- */
const releaseSeatsDeleteBooking = inngest.createFunction(
  { id: "release-seats-deleting-bookings" },
  { event: "app/checkpayment" },
  async ({ event, step }) => {
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
    await step.sleepUntil("wait-10-mins", tenMinutesLater);

    await step.run("check-payment", async () => {
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId);
      if (!booking) return;

      if (!booking.isPaid) {
        const show = await Show.findById(booking.show);
        if (show) {
          booking.bookedSeats.forEach((seat) => delete show.occupiedSeats[seat]);
          show.markModified("occupiedSeats");
          await show.save();
        }
        await Booking.findByIdAndDelete(bookingId);
      }
    });
  }
);

/* -------------------- Send Booking Confirmation Email -------------------- */
const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event, step }) => {
    console.log("📩 sendBookingConfirmationEmail triggered:", event.data);
    const { bookingId } = event.data;

    // Optional: wait a second to ensure DB is updated
    await step.sleep("wait-db-update", 1000);

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      })
      .populate("user");

    if (!booking) return console.log("Booking not found:", bookingId);

    console.log("Sending email to:", booking.user.email);

    await sendEmail({
      to: booking.user.email,
      subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
      body: `<div style="font-family:Arial,sans-serif;line-height:1.5;">
        <h2>Hi ${booking.user.name},</h2>
        <p>Your booking for <strong style="color:#F84565;">"${booking.show.movie.title}"</strong> is confirmed!</p>
        <p>
          <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" })}<br/>
          <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })}
        </p>
        <p>Enjoy the show!</p>
        <p>Thanks for booking with us!<br/>- Quickticket Team</p>
      </div>`,
    });

    console.log("✅ Email sent successfully for bookingId:", bookingId);
  }
);

/* -------------------- Register All Functions -------------------- */
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsDeleteBooking,
  sendBookingConfirmationEmail,
];

/* -------------------- Optional: auto-register functions -------------------- */
// In your Inngest server entry point:
// import { inngest, functions } from "./inngest/index.js";
// functions.forEach((fn) => inngest.registerFunction(fn));
