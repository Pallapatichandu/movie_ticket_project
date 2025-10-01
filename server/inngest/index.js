import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/show.js"; 
import sendEmail from "../configs/nodeMailer.js";

// Create a client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/* -------------------- Clerk → MongoDB Sync Functions -------------------- */

// 1. User Created
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id, // Clerk ID as primary key
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.create(userData);
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

    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData, { new: true });
  }
);

/* -------------------- Release Seats if Payment Not Done -------------------- */
const releaseSeatsDeleteBooking = inngest.createFunction(
  { id: "release-seats--deleting-bookings" },
  { event: "app/checkpayment" },
  async ({ event, step }) => {
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);

    await step.sleepUntil("wait-for-10-minutes", tenMinutesLater);

    await step.run("check-payment-status", async () => {
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId);

      if (!booking) return; // Already deleted

      if (!booking.isPaid) {
        const show = await Show.findById(booking.show);

        if (show) {
          booking.bookedSeats.forEach((seat) => {
            delete show.occupiedSeats[seat];
          });

          show.markModified("occupiedSeats");
          await show.save();
        }

        await Booking.findByIdAndDelete(booking._id);
      }
    });
  }
);

/* -------------------- Send Booking Confirmation Email -------------------- */
const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event }) => {
    const { bookingId } = event.data;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      })
      .populate("user");

    if (!booking) return;

    await sendEmail({
      to: booking.user.email,
      subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
      body: `<div style="font-family:Arial,sans-serif;line-height:1.5;">
        <h2>Hi ${booking.user.name},</h2>
        <p>Your booking for <strong style="color:#F84565;">"${booking.show.movie.title}"</strong> is confirmed!</p>
        <p>
          <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}<br/>
          <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>
        <p>Enjoy the show!</p>
        <p>Thanks for booking with us!<br/>- Quickticket Team</p>
      </div>`,
    });
  }
);

/* -------------------- Export All Functions -------------------- */
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsDeleteBooking,
  sendBookingConfirmationEmail,
];
