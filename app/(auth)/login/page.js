"use client";
import AuthForm from "@/components/AuthForm";
import { loginUser } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (data) => {
    const res = await loginUser(data);
    login(res);
    router.push("/products");
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
}


