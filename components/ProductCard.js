"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 2,
        borderRadius: "12px",
        boxShadow: 2,
      }}
    >
      {/* 🖼 Product Image */}
   

      {/* 📄 Product Details */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>

        <Typography color="text.secondary" fontSize="14px">
          ₹{product.price}
        </Typography>

        <Typography fontSize="13px" color="gray">
          {product.description || "No description"}
        </Typography>
      </CardContent>

      {/* ⚡ Actions */}
      <Box display="flex" gap={1}>
        <Link href={`/products/${product._id}`}>
          <Button variant="outlined">View</Button>
        </Link>

        <Button
          variant="contained"
          onClick={() => onEdit(product)}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
}

