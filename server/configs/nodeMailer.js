import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sedEmail=async({to,subject,body})=>{
    const reaponse=await transporter.sendMail({
        from:process.env.SENDER_EMAIL,
        to,
        subject,
        html:body
    })
    return reaponse

}
export default sedEmail