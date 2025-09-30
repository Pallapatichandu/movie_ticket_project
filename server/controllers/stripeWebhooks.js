import stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/client.js"; // your inngest client setup

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
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const { bookingId } = session.metadata;

        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        // 🔥 Trigger Inngest function
        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });

        break;
      }
      case "payment_intent.succeeded": {
        // optional: handle same as above
        break;
      }
      default:
        console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (error) {
    console.log("Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
