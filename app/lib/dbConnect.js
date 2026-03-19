import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Error:", error);
    throw error;
  }
};



