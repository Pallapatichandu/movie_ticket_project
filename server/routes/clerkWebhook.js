// routes/clerkWebhook.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/clerk-webhook", async (req, res) => {
  try {
    const event = req.body;

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = event.data;

      await User.create({
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
      });

      console.log("✅ User saved to DB");
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
