import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (request, response) => {
  console.log("👉 Stripe webhook called");

  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body, // raw body required!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Stripe event constructed:", event.type);
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      /* ---------------- checkout.session.completed ---------------- */
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("👉 Checkout session completed:", session.id);

        const bookingId = session.metadata?.bookingId;
        console.log("👉 Metadata bookingId:", bookingId);

        if (!bookingId) {
          console.error("❌ No bookingId in session metadata");
          break;
        }

        const updated = await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });
        console.log("✅ Booking updated:", updated?._id);

        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });
        console.log("✅ Inngest event sent:", bookingId);

        break;
      }

      /* ---------------- payment_intent.succeeded ---------------- */
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("👉 PaymentIntent succeeded:", paymentIntent.id);

        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });
        const session = sessionList.data[0];
        console.log("👉 Retrieved session for PI:", session?.id);

        const bookingId = session?.metadata?.bookingId;
        console.log("👉 Metadata bookingId:", bookingId);

        if (bookingId) {
          const updated = await Booking.findByIdAndUpdate(bookingId, {
            isPaid: true,
            paymentLink: "",
          });
          console.log("✅ Booking updated:", updated?._id);

          await inngest.send({
            name: "app/show.booked",
            data: { bookingId },
          });
          console.log("✅ Inngest event sent:", bookingId);
        } else {
          console.error("❌ No bookingId found in session metadata");
        }
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
