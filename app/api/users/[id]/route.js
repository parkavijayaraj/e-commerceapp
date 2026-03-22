import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";


// ✅ UPDATE USER
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params; // ✅ FIXED

    const body = await req.json();

    // hash password if provided
    if (body.password && body.password.trim() !== "") {
      body.password = await bcrypt.hash(body.password, 10);
    } else {
      delete body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return new Response(JSON.stringify({ error: "Update failed" }), {
      status: 500,
    });
  }
}

// ✅ DELETE USER
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params; // ✅ FIXED

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return new Response(JSON.stringify({ error: "Delete failed" }), {
      status: 500,
    });
  }
}