"use client";
import AuthForm from "@/components/AuthForm";
import { registerUser } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const handleRegister = async (data) => {
    await registerUser(data);
    router.push("/login");
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}




