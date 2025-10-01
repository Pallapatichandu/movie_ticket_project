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



const app=express()
const port=3000

await connectDB()
//stripe webhooks Rout
app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

// middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//API Routes
app.get("/",(req,res)=>res.json('hello chandu'))
// Set up the "/api/inngest" (recommended) routes with the serve handler
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show',showRouter)
app.use('/api/booking',bookingRouter)


app.use("/api/admin",adminRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>console.log(`server listings at http://localhost:${port}`))

