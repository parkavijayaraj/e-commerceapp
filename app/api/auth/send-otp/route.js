// /app/api/auth/send-otp/route.js
import nodemailer from "nodemailer";
import { dbConnect } from "@/app/lib/dbConnect";
import Otp from "@/app/models/Otp";

export async function POST(req) {
  try {
    const { email } = await req.json();

    await dbConnect();

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await Otp.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "OTP",
      text: `Your OTP is ${otp}`,
    });

    return Response.json({ message: "OTP sent" });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

