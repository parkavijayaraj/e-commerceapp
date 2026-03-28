"use client";

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

export default function ResetPassword() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check mismatch
  const isMismatch = confirm && password !== confirm;

  const handleReset = async () => {
    if (isMismatch) return;

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    setLoading(false);

    if (res.ok) {
      alert("Password updated ✅");
      router.push("/login");
    } else {
      alert("Something went wrong");
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
      <Paper
        elevation={6}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 60,
            height: 60,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            backgroundColor: "#eef2ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lock color="primary" />
        </Box>

        <Typography variant="h5" fontWeight="bold">
          Reset Password
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter your new password below
        </Typography>

        {/* New Password */}
        <TextField
          fullWidth
          label="New Password"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          margin="normal"
          error={isMismatch}
          helperText={isMismatch ? "Passwords do not match" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 3,
            backgroundColor: "#0f172a",
            "&:hover": {
              backgroundColor: "#020617",
            },
          }}
          onClick={handleReset}
          disabled={loading || isMismatch || !password || !confirm}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </Button>
      </Paper>
    </Box>
  );
}

