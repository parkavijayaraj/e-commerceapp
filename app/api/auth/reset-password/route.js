// app/api/auth/reset-password/route.js
import jwt from "jsonwebtoken";
import User from "@/app/models/User"; // Your MongoDB User model
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, otp, newPassword } = await req.json();

  if (!token || !otp || !newPassword)
    return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });

  try {
    const decoded = jwt.verify(token, process.env.NODEMAILER_JWTSECRET);
    if (Number(decoded.otp) !== Number(otp))
      return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });

    // Update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });

    return new Response(JSON.stringify({ message: "Password updated successfully" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "OTP expired or invalid" }), { status: 400 });
  }
}


