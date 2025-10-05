import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    // ✅ Verify event
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      // ✅ Correct event for checkout success
      case "checkout.session.completed": {
        const session = event.data.object;

        if (!session.metadata || !session.metadata.bookingId) {
          console.warn("⚠️ No bookingId found in session metadata");
          break;
        }

        const { bookingId } = session.metadata;

        // ✅ Mark booking as paid
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentStatus: "paid",
          paymentLink: "",
        });

        console.log(`✅ Booking ${bookingId} marked as paid`);
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.error("⚠️ Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
