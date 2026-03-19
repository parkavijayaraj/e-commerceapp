import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { dbConnect } from "../lib/dbConnect";

export const registerUser = async (data) => {
  await dbConnect();

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);

  return { user, token };
};

