import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoutes.js"
import bookingRouter from "./routes/bookingRouters.js"
import adminRouter from "./routes/adminRouter.js"
import userRouter from "./routes/userRouters.js"
import { stripeWebhook } from "./controllers/stripeWebhooks.js"

const app = express()
const port = 3000

await connectDB()

// ⚠️ IMPORTANT: Stripe webhook MUST come BEFORE express.json()
// This route needs raw body for signature verification
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Middleware - These come AFTER stripe webhook
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// API Routes
app.get("/", (req, res) => res.json('Movie Ticket Booking API'))

// Inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions }));

// Main routes
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))