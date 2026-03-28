'use client';

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function VerifyOtpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // 🔥 Handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  // 🔥 Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      alert("Enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: finalOtp }),
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
          Enter the 4-digit OTP
        </Typography>

        {/* 🔢 OTP BOXES */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              style={{
                width: "50px",
                height: "55px",
                textAlign: "center",
                fontSize: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          ))}
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1.3,
            borderRadius: 3,
            backgroundColor: "#0f172a",
            "&:hover": {
              backgroundColor: "#020617",
            },
          }}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Verify OTP"
          )}
        </Button>
      </Paper>
    </Box>
  );
}

