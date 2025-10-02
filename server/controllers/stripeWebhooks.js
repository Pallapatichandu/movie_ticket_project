import Stripe from "stripe";
import Booking from "../models/Booking.js";
export const stripeWebhooks=async(request,response)=>{
  const stripeIntence=new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig=request.headers["stripe-singnature"];
  let event;

try {
  event=stripeIntence.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
  
} catch (error) {
  return response.status(400).send(`Webhook Error:${error.message}`)

  
  
}
try {
  switch(event.type){
    case 'payment_intent.succeeded':{
      const paymentIntent=event.data.object
      const sessionList=await stripeIntence.checkout.sessions.list({
        payment_intent:paymentIntent.id
      })
      const session=sessionList.data[0]
      const {bookingId}=session.metadata
      await Booking.findByIdAndUpdate(bookingId,{
        isPaid:true
      })
      break
    }
    default:
      console.log('Unhandle event type:',event.type)

  }
  response.json({received:true})
  
} catch (error) {
  console.log('webhook processing error:',error)
  response.status(500).send("Internal Server Error")
  
}
}