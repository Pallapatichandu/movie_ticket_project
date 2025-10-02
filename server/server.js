import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRouters.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouters.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";


const app = express();
const port = 3000;

await connectDB();

/* -------------------- STRIPE WEBHOOK ROUTE -------------------- */
// ⚠️ Must come BEFORE express.json()
// Use raw body parsing only for this route
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

/* -------------------- GLOBAL MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json()); // now safe for other routes
app.use(clerkMiddleware());

/* -------------------- ROUTES -------------------- */
app.get("/", (req, res) => res.json("hello chandu"));

// Inngest functions
app.use("/api/inngest", serve({ client: inngest, functions }));

// Business routes
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

/* -------------------- START SERVER -------------------- */
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);