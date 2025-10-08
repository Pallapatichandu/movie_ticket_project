import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/show.js";
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

    const userData = {
      _id: id, // Ensure schema supports String IDs
      email: email_addresses[0].email_address,
      name: first_name + " " +last_name,
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
      _id:id,
      email: email_addresses[0].email_address,
      name: first_name + " " +last_name,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData);
  }
);
//inngest function to cancel booking  and releade booking seats of show after 10 minutes of booking create if payment is not made
const deleteAllBookings = inngest.createFunction(
  { id: "release-seats-delete-booking" },
  { event: "app/checkpayment" },
  async ({ event, step }) => {
    const bookingId = event.data.bookingId;

    // Wait 10 minutes (can adjust)
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
    await step.sleepUntil("wait-for-10-minutes", tenMinutesLater);

    // Fetch booking just before deletion
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      console.log(`Booking ${bookingId} does not exist. Skipping deletion.`);
      return;
    }

    // Check if booking is paid
    if (booking.isPaid) {
      console.log(`Booking ${bookingId} is paid. Not deleting.`);
      return;
    }

    // Booking is unpaid → release seats and delete booking
    const show = await Show.findById(booking.show);
    if (show) {
      booking.bookedSeats.forEach((seat) => delete show.occupiedSeats[seat]);
      show.markModified("occupiedSeats");
      await show.save();
      console.log(`Released seats for unpaid booking ${bookingId}`);
    }

    await Booking.findByIdAndDelete(booking._id);
    console.log(`Deleted unpaid booking ${bookingId}`);
  }
);


const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event,step }) => {
    const { bookingId } = event.data;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      })
      .populate("user");

    if (!booking || !booking.isPaid) return;

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

    console.log(`✅ Confirmation email sent to ${booking.user.email}`);
  }
);


//inngest function to send reminder


export const sendShowReminders = inngest.createFunction(
  { id: "send-show-reminders" },
  { cron: "0 */8 * * *" }, // every 8 hours
  async ({ step }) => {
    const now = new Date();
    const in8Hours = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    const windowStart = new Date(in8Hours.getTime() - 10 * 60 * 1000);

    // prepare reminder tasks
    const reminderTasks = await step.run("prepare-reminder-task", async () => {
      const shows = await Show.find({
        showTime: { $gte: windowStart, $lte: in8Hours },
      }).populate("movie");

      const tasks = [];

      for (const show of shows) {
        if (!show.movie || !show.occupiedSeats) continue;

        const userIds = [...new Set(Object.values(show.occupiedSeats))];
        if (userIds.length === 0) continue;

        const users = await User.find({ _id: { $in: userIds } }).select(
          "name email"
        );

        for (const user of users) {
          tasks.push({
            userEmail: user.email,
            userName: user.name,
            movieTitle: show.movie.title,
            showTime: show.showTime,
          });
        }
      }

      return tasks;
    });

    if (reminderTasks.length === 0) {
      return { sent: 0, failed: 0, message: "No reminders to send." };
    }

    // send reminder emails
    const results = await step.run("send-all-reminders", async () => {
      return await Promise.allSettled(
        reminderTasks.map((task) =>
          sendEmail({
            to: task.userEmail,
            subject: `Reminder: Your movie '${task.movieTitle}' starts soon!`,
            body: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Hello ${task.userName},</h2>
                <p>This is a quick reminder that your movie:</p>
                <h3 style="color: #F84565;">"${task.movieTitle}"</h3>
                <p>
                  is scheduled for 
                  <strong>${new Date(task.showTime).toLocaleDateString(
                    "en-US",
                    { timeZone: "Asia/Kolkata" }
                  )}</strong> 
                  at 
                  <strong>${new Date(task.showTime).toLocaleTimeString(
                    "en-US",
                    { timeZone: "Asia/Kolkata" }
                  )}</strong>.
                </p>
                <p>
                  It starts in approximately <strong>8 hours</strong> — make sure you're ready!
                </p>
                <br/>
                <p>Enjoy the show!<br/>QuickShow Team</p>
              </div>
            `,
          })
        )
      );
    });

    // count success & failures
    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    // ✅ return final summary
    return {
      sent,
      failed,
      message: `Sent ${sent} reminder(s), ${failed} failed`,
    };
  }
);

const sendNewShowNotifications = inngest.createFunction(
  { id: "send-new-show-notifications" },
  { event: "app/show.added" },
  async ({ event }) => {
    const { movieTitle} = event.data;

    // Get all registered users
    const users = await User.find({});
    if (users.length === 0) {
      return { message: "No users found to notify." };
    }

    // Loop through users and send email
    for (const user of users) {
      const userEmail = user.email;
      const userName = user.name;

      const subject = `🎬 New Show Added: ${movieTitle}`;
      const body = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hi ${userName},</h2>
          <p>We've just added a new show to our library!</p>
          <h3 style="color: #F84565;">"${movieTitle}"</h3>
          <p>Visit our website to explore show timings and book your tickets.</p>
          <br/>
          <p>Thanks,<br/>QuickShow Team</p>
        </div>
      `;

      try {
        await sendEmail({
          to: userEmail,
          subject,
          body,
        });
      } catch (error) {
        console.error(`❌ Failed to send email to ${userEmail}:`, error.message);
      }
    }

    return { message: "✅ Notifications sent to all users." };
  }
);






/* -------------------- Export All Functions -------------------- */
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
 deleteAllBookings,
  sendBookingConfirmationEmail,
  sendShowReminders,
  sendNewShowNotifications
  
 
 
  
 

];