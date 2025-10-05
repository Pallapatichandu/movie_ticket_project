import { Inngest } from "inngest";
import User from "../models/User.js";

import Booking from "../models/Booking.js";
import Show from "../models/show.js";


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







/* -------------------- Export All Functions -------------------- */
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  
 

];