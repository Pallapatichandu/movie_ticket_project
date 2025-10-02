import Stripe from "stripe";
import Booking from "../models/Booking.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"]; // ✅ fixed spelling
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // ✅ bookingId comes from session metadata
        const bookingId = session.metadata?.bookingId;

        if (bookingId) {
          await Booking.findByIdAndUpdate(bookingId, {
            isPaid: true,
          });
          console.log(`✅ Booking ${bookingId} marked as paid`);
        } else {
          console.log("⚠️ No bookingId in session metadata");
        }
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.log("❌ Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
