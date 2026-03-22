"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, TextField, Typography, Button, Link, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const router = useRouter();

  // Client-only rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

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
      <Card sx={{ maxWidth: 400, width: "90%", p: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            Profile Form
          </Typography>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Forgot Password Link */}
          <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
            <Link
              component="button"
              variant="body2"
              onClick={() => router.push("/forgot-password")}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 1 }}>
            Save
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}