"use client"; // This is required for hooks

import { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, Alert } from "@mui/material";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) return setError(true), setMessage("Please enter email");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setOtpSent(true);
      setOtpToken(data.token);
      setMessage(data.message);
      setError(false);
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
            {otpSent ? "OTP Sent" : "Forgot Password"}
          </Typography>
          {message && <Alert severity={error ? "error" : "success"} sx={{ mb: 2 }}>{message}</Alert>}
          {!otpSent && (
            <>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button fullWidth variant="contained" onClick={sendOtp} disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </>
          )}
          {otpSent && (
            <Typography textAlign="center" mt={2}>
              Check your email for the OTP. Then go to Reset Password page.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}


