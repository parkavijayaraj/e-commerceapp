// /app/api/auth/reset-password/route.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json({ error: "Missing data" }, { status: 400 });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return Response.json({ message: "Password updated" });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

