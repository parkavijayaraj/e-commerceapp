"use client";

import { Box, Typography, Container } from "@mui/material";

export default function AboutUsPage() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to our e-commerce store! We are committed to providing the best products and services
        to our customers. Our mission is to deliver high-quality products at competitive prices while
        ensuring excellent customer experience.
      </Typography>
      <Typography variant="body1" paragraph>
        Founded in 2026, our store has quickly become a trusted place for shopping a variety of
        products including electronics, fashion, and lifestyle items.
      </Typography>
      <Typography variant="body1">
        We value customer feedback and constantly work to improve our offerings. Thank you for choosing
        us for your shopping needs!
      </Typography>
    </Container>
  );
}

