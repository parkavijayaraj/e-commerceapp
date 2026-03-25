"use client";

import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper, Link, Alert, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthForm({ type }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // LOGIN
  const handleLogin = async () => {
    setLoading(true); 
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save JWT token in localStorage
      localStorage.setItem("token", data.token);

      setMessage("Login successful ✅");
      setError(false);

      // Redirect to products/dashboard page
      router.push("/products");
    } catch (err) {
      setMessage(err.message);
      setError(true);
      console.error(err);
    }
  };

  // REGISTER
  const handleRegister = async () => {
    setLoading(true); 
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      setMessage("Registration successful ✅");
      setError(false);

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err) {
      setMessage(err.message);
      setError(true);
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 350, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          {type === "login" ? "Welcome To MyShop" : "Create Account 🚀"}
        </Typography>

        {message && (
          <Alert severity={error ? "error" : "success"} sx={{ my: 2 }}>
            {message}
          </Alert>
        )}

        <Box mt={3} display="flex" flexDirection="column" gap={2}>
          {/* Name only for registration */}
          {type === "register" && (
            <TextField
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <TextField
            label="Email"
            fullWidth
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            variant="contained"
            size="large"
            onClick={type === "login" ? handleLogin : handleRegister}
          >
            {type === "login" ? "Login" : "Register"}
          </Button>

          {/* Links */}
          <Typography mt={2} textAlign="center">
            {type === "login" ? (
              <>
                Don't have an account? <Link href="/register">Register</Link>
              </>
            ) : (
              <>
                Already have an account? <Link href="/login">Login</Link>
              </>
            )}
          </Typography>

          {/* Forgot Password link only for login */}
          {type === "login" && (
            <Box display="flex" justifyContent="center">
              <Link
                component="button"
                variant="body2"
                onClick={() => router.push("/forgot-password")}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
