'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isMismatch = confirm && password !== confirm;

  const handleReset = async () => {
    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    if (isMismatch) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password updated ✅");
        router.push("/login");
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Error occurred");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fb" }}>
      <Paper elevation={6} sx={{ width: 380, p: 4, borderRadius: 4, textAlign: "center" }}>

        <Box sx={{ width: 60, height: 60, mx: "auto", mb: 2, borderRadius: "50%", backgroundColor: "#eef2ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lock color="primary" />
        </Box>

        <Typography variant="h5" fontWeight="bold">Reset Password</Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your new password
        </Typography>

        <TextField
          fullWidth
          label="New Password"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          margin="normal"
          error={isMismatch}
          helperText={isMismatch ? "Passwords do not match" : ""}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleReset}
          disabled={loading || isMismatch || !password || !confirm}
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>

      </Paper>
    </Box>
  );
}


