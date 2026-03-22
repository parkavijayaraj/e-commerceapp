// app/(auth)/reset-password/page.js
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("utoken");
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    if (!otp || !newPassword) return setError(true), setMessage("All fields are required");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      setMessage(data.message);
      setError(false);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(true);
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ maxWidth: 400, width: "100%", p: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Reset Password
          </Typography>
          {message && <Alert severity={error ? "error" : "success"} sx={{ mb: 2 }}>{message}</Alert>}
          <TextField fullWidth label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ mb: 2 }} />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" onClick={resetPassword} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}



