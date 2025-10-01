import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body, // raw body only!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        if (!session.metadata?.bookingId) {
          console.error("⚠️ No bookingId in session.metadata:", session.id);
          break;
        }

        const bookingId = session.metadata.bookingId;

        // ✅ Update booking
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        console.log("✅ Booking marked paid:", bookingId);

        // ✅ Trigger Inngest event for email
        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });

        console.log("📧 Inngest event sent for bookingId:", bookingId);

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const sessions = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1,
        });

        const session = sessions.data[0];
        if (session?.metadata?.bookingId) {
          const bookingId = session.metadata.bookingId;
          await Booking.findByIdAndUpdate(bookingId, {
            isPaid: true,
            paymentLink: "",
          });
          console.log("✅ Payment intent booking updated:", bookingId);
        }
        break;
      }

      default:
        console.log("ℹ️ Unhandled Stripe event:", event.type);
    }

    res.json({ received: true }); // ✅ Always respond to Stripe
  } catch (error) {
    console.error("❌ Webhook handler error:", error);
    res.status(500).send("Internal Server Error");
  }
};
