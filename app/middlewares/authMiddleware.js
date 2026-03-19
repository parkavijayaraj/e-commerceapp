import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");

  console.log("HEADER:", authHeader); // debug

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN:", token); // debug

  return jwt.verify(token, process.env.JWT_SECRET);
};

