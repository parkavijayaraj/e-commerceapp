import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all users (exclude password)
    const users = await User.find().select("-password");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch users" }),
      { status: 500 }
    );
  }
}

