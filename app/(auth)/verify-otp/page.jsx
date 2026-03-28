"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function VerifyOtp() {
  const router = useRouter();
  const email = useSearchParams().get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move next
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      alert("Enter complete OTP");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp: finalOtp }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push(`/reset-password?token=${data.token}`);
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
          Verify OTP
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter the 4-digit code sent to your email
        </Typography>

        {/* OTP Boxes */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
              style={{
                width: "60px",
                height: "60px",
                fontSize: "22px",
                textAlign: "center",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ borderRadius: 3 }}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Verify OTP"}
        </Button>
      </Paper>
    </Box>
  );
}

