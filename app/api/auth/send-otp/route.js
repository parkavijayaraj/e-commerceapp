import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // 1. Basic Validation
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    // 2. Generate 4-digit OTP and Sign JWT
    // We include the email and OTP in the token so we can verify them later
    const otp = Math.floor(1000 + Math.random() * 9000);
    
    if (!process.env.NODEMAILER_JWTSECRET) {
      throw new Error("NODEMAILER_JWTSECRET is not defined in .env");
    }

    const token = jwt.sign(
      { email, otp }, 
      process.env.NODEMAILER_JWTSECRET, 
      { expiresIn: "10m" }
    );

    // 3. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Send the Email
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FRIENDLY_NAME || 'MyShop'}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for MyShop",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #333;">Verification Code</h2>
          <p>Your OTP for MyShop is: <b style="font-size: 24px; color: #1976d2;">${otp}</b></p>
          <p>This code is valid for 10 minutes.</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    // 5. Success Response
    return new Response(
      JSON.stringify({ 
        token, // Send this back so the frontend can use it for the verify-otp step
        message: "OTP sent successfully" 
      }), 
      { 
        status: 200,
        headers: { "Content-Type": "application/json" } 
      }
    );

  } catch (err) {
    console.error("OTP Error:", err);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send OTP", 
        details: err.message 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}



