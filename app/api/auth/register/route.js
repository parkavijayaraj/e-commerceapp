// app/api/auth/register/route.js
import { register } from "@/controllers/authController";

export async function POST(req) {
  return register(req);
}


