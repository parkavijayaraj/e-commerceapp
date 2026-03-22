"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "@/components/Productservice";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetchProducts({});
    setProducts(res.data.products);
    setLoading(false);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await deleteProduct(id);
    load();
  };

  // ✅ EDIT OPEN
  const handleEdit = (row) => {
    setSelected(row);
    setOpen(true);
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    await updateProduct(selected._id, selected);
    setOpen(false);
    load();
  };

  const columns = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "stock", headerName: "Stock", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary">
            <VisibilityIcon />
          </IconButton>

          <IconButton color="warning" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>

          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Products Management
      </Typography>

      <Box sx={{ height: 500, background: "white" }}>
        <DataGrid
          rows={products}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}
          pageSize={5}
        />
      </Box>

      {/* 🔥 EDIT MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={selected?.name || ""}
            onChange={(e) =>
              setSelected({ ...selected, name: e.target.value })
            }
          />

          <TextField
            label="Price"
            type="number"
            value={selected?.price || ""}
            onChange={(e) =>
              setSelected({ ...selected, price: e.target.value })
            }
          />

          <TextField
            label="Stock"
            type="number"
            value={selected?.stock || ""}
            onChange={(e) =>
              setSelected({ ...selected, stock: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

