// /app/api/auth/send-otp/route.js

import nodemailer from "nodemailer";
import { dbConnect } from "@/app/lib/dbConnect";
import Otp from "@/app/models/Otp";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 1. Validation
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
      });
    }

    await dbConnect();

    // 2. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // 3. Save OTP in DB
    await Otp.create({
      email: email.toLowerCase(),
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
    });

    // 4. Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // you can later switch to SMTP config
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5. Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>OTP Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="color: #1976d2;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });

    // 6. Response
    return new Response(
      JSON.stringify({ message: "OTP sent successfully" }),
      { status: 200 }
    );

  } catch (err) {
    console.error("OTP Error:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}