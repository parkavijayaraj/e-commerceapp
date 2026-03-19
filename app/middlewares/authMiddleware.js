import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  return jwt.verify(token, process.env.JWT_SECRET);
};


