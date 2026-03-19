import { registerUser, loginUser } from "@/services/authService";

export const register = async (req) => {
  try {
    const body = await req.json();
    const user = await registerUser(body);

    return Response.json(user);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

export const login = async (req) => {
  try {
    const body = await req.json();
    const data = await loginUser(body);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};