"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { fetchProducts } from "@/components/Productservice";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });
  const [editId, setEditId] = useState(null); // for editing

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await fetchProducts({});
    setProducts(res.data.products);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Add or Edit product
  const handleSaveProduct = async () => {
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `https://ecommercemyshopapp.netlify.app/api/product/${editId}`
        : "https://ecommercemyshopapp.netlify.app/api/product";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          price: Number(product.price),
          stock: Number(product.stock),
        }),
      });

      if (res.ok) {
        alert(editId ? "Product updated!" : "Product added!");
        setProduct({ name: "", price: "", stock: "" });
        setEditId(null);
        setShowForm(false);
        load();
      } else {
        alert("Failed to save product");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`https://ecommercemyshopapp.netlify.app/api/product/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted!");
        load();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  // Edit product
  const handleEdit = (p) => {
    setProduct({ name: p.name, price: p.price, stock: p.stock });
    setEditId(p._id);
    setShowForm(true);
  };

  return (
    <Paper sx={{ p: 2 }}>
      {/* Header Row */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Products List</Typography>
        <Button variant="contained" onClick={() => { setShowForm(!showForm); setEditId(null); }}>
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </Box>

      {/* Add/Edit Product Form */}
      {showForm && (
        <Card sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <TextField
              label="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSaveProduct}>
              {editId ? "Update Product" : "Save Product"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>
                <IconButton color="warning" onClick={() => handleEdit(p)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(p._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
