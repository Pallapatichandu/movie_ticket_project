import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const bookingId = session.metadata.bookingId;

        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        console.log("✅ Booking updated for ID:", bookingId);

        // Small delay to ensure DB write completes
        await new Promise(resolve => setTimeout(resolve, 500));

        // Fire Inngest event
        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });

        console.log("✅ Inngest event fired for bookingId:", bookingId);
        break;
      }

      case "payment_intent.payment_failed": {
        console.warn("⚠️ Payment failed:", event.data.object.id);
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook handler error:", error);
    res.status(500).send("Internal server error");
  }
};
