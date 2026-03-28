// /app/api/auth/verify-otp/route.js
import jwt from "jsonwebtoken";
import { dbConnect } from "@/app/lib/dbConnect";
import Otp from "@/app/models/Otp";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    await dbConnect();

    console.log("Incoming:", email, otp);

    const record = await Otp.findOne({
      email: email.toLowerCase(),
      otp: String(otp),
    });

    if (!record) {
      return Response.json({ error: "OTP not found" }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      return Response.json({ error: "OTP expired" }, { status: 400 });
    }

    // delete old OTP
    await Otp.deleteMany({ email: email.toLowerCase() });

    // generate token
    const token = jwt.sign(
      { email: email.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return Response.json({ token });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

