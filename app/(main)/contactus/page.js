"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Real-time validation
    if (name === "name" && value.length < 3) {
      setErrors((prev) => ({ ...prev, name: "Name must be at least 3 characters" }));
    } else if (name === "name") {
      setErrors((prev) => ({ ...prev, name: "" }));
    }

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (name === "message" && value.length < 10) {
      setErrors((prev) => ({ ...prev, message: "Message must be at least 10 characters" }));
    } else if (name === "message") {
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple final validation
    if (!form.name || !form.email || !form.message) {
      setErrors({
        name: !form.name ? "Name is required" : "",
        email: !form.email ? "Email is required" : "",
        message: !form.message ? "Message is required" : "",
      });
      return;
    }

    try {
      // Replace this with your backend API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess("Message sent successfully!");
        setError("");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Try again later.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      setSuccess("");
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      {/* Hero Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold">
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          We’re here to help! Reach out to us and we’ll respond within 24 hours.
        </Typography>
      </Box>

      {/* Alerts */}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Main Grid */}
      <Grid container spacing={4}>
        {/* Left Side: Contact Info */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" mb={2} fontWeight="bold">Get in Touch</Typography>
            <Typography mb={1}>📍 Address: 123 E-commerce Street, Chennai, India</Typography>
            <Typography mb={1}>📧 Email: support@youstore.com</Typography>
            <Typography mb={1}>📞 Phone: +91 9876543210</Typography>
            <Typography mt={2} color="text.secondary">
              We love to hear from our customers. Send us your queries, feedback or suggestions.
            </Typography>
          </Paper>
        </Grid>

        {/* Right Side: Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box component="form" onSubmit={handleSubmit}>
              
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    value={form.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    value={form.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    name="message"
                    fullWidth
                    multiline
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ width: "100%" }}
                  >
                    Send Message
                  </Button>
                </Grid>
           
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

