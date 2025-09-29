import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // raw body from express.raw
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata.bookingId;

      // ✅ Update booking
      await Booking.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentLink: "",
      });

      // ✅ Fire Inngest event for email
      await inngest.send({
        name: "app/show.booked",  // must match function listener
        data: { bookingId },
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook handler error:", error);
    res.status(500).send("Internal server error");
  }
};


