import stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
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
      case "checkout.session.completed": {
        const session = event.data.object;
        const { bookingId } = session.metadata;

        if (!bookingId) {
          console.error("❌ No bookingId in session metadata");
          return response.status(400).json({ error: "Missing bookingId" });
        }

        // Update booking to paid
        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          {
            isPaid: true,
            paymentLink: "",
          },
          { new: true }
        );

        if (!booking) {
          console.error("❌ Booking not found:", bookingId);
          return response.status(404).json({ error: "Booking not found" });
        }

        // Trigger Inngest email function
        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });

        console.log("✅ Payment processed and email triggered for:", bookingId);
        break;
      }

      case "payment_intent.succeeded": {
        // Optional: Add additional payment confirmation logic here
        console.log("💰 Payment intent succeeded:", event.data.object.id);
        break;
      }

      default:
        console.log("ℹ️ Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};