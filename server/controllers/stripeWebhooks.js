import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // must be raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const bookingId = session.metadata.bookingId;

      // ✅ Update booking as paid
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { isPaid: true },
        { new: true }
      );

      if (booking) {
        // ✅ Trigger Inngest event
        await inngest.send({
          name: "app/show.booked",
          data: { bookingId: booking._id.toString() },
        });
        console.log("🎉 Payment confirmed + event sent for", bookingId);
      }

      break;
    }
  }

  res.json({ received: true });
};
