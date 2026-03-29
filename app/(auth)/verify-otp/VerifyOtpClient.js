'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function VerifyOtpClient() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // ✅ Verify OTP
  const handleVerify = async () => {
    if (!email || !otp) {
      alert("Enter email and OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP Verified ✅");
        router.push(`/reset-password?token=${data.token}`);
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (err) {
      alert("Error occurred");
    }

    setLoading(false);
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    if (!email) {
      alert("Enter your email first");
      return;
    }

    setResendLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP resent successfully ✅");
      } else {
        alert(data.error || "Failed to resend OTP");
      }
    } catch (err) {
      alert("Error occurred while resending OTP");
    }

    setResendLoading(false);
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
      <Paper
        elevation={6}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Verify OTP
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter the OTP sent to your email
        </Typography>

        {/* Email */}
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />

        {/* OTP */}
        <TextField
          fullWidth
          label="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          margin="normal"
        />

        {/* Verify Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 3,
            backgroundColor: "#0f172a",
            "&:hover": { backgroundColor: "#020617" },
          }}
          onClick={handleVerify}
          disabled={loading || !email || !otp}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
        </Button>

        {/* Resend OTP Button */}
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2, py: 1.3, borderRadius: 3 }}
          onClick={handleResend}
          disabled={resendLoading || !email}
        >
          {resendLoading ? <CircularProgress size={24} /> : "Resend OTP"}
        </Button>
      </Paper>
    </Box>
  );
}

