import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // must be raw body!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle completed checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.error("❌ No bookingId in session metadata");
      return res.status(400).send("Missing bookingId");
    }

    try {
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        console.error("❌ Booking not found:", bookingId);
        return res.status(404).send("Booking not found");
      }

      booking.isPaid = true;
      await booking.save();

      // ✅ Trigger Inngest event
      await inngest.send({
        name: "app/show.booked",
        data: { bookingId: booking._id.toString() },
      });

      console.log("🎉 Payment confirmed + event sent for", bookingId);
    } catch (err) {
      console.error("❌ Error updating booking:", err);
      return res.status(500).send("Error updating booking");
    }
  }

  res.json({ received: true });
};