import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const token = jwt.sign({ email, otp }, process.env.NODEMAILER_JWTSECRET, { expiresIn: "10m" });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FRIENDLY_NAME}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for MyShop",
      html: `<p>Your OTP is: <b>${otp}</b></p>`,
    });

    return new Response(JSON.stringify({ token, message: "OTP sent successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send OTP", details: err.message }), { status: 500 });
  }
}


