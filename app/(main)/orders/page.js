"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();

        if (mounted) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => (mounted = false);
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      width: 120,
      renderCell: (params) => `₹${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Delivered"
              ? "success"
              : params.value === "Pending"
              ? "warning"
              : "default"
          }
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 180,
      renderCell: (params) =>
        new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <IconButton onClick={() => setSelected(params.row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Orders
      </Typography>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            height: 500,
            background: "#fff",
            borderRadius: 3,
            p: 2,
          }}
        >
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={5}
            sx={{ border: "none" }}
          />
        </Box>
      )}

      {/* 🔥 Order Details Dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selected && (
            <Box>
              <Typography><b>Order ID:</b> {selected._id}</Typography>
              <Typography><b>Total:</b> ₹{selected.total}</Typography>
              <Typography><b>Status:</b> {selected.status}</Typography>
              <Typography>
                <b>Date:</b>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </Typography>

              {/* If you have items */}
              {selected.items && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Items:</Typography>
                  {selected.items.map((item, i) => (
                    <Typography key={i}>
                      • {item.name} × {item.qty}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

