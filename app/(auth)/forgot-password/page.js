"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    setLoading(true);

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(`/verify-otp?email=${email}`);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 380, borderRadius: 4 }} elevation={6}>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Forgot Password
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your email to receive OTP
        </Typography>

        <TextField
          fullWidth
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, borderRadius: 3 }}
          onClick={sendOtp}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send OTP"}
        </Button>
      </Paper>
    </Box>
  );
}