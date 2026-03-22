"use client";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      setUsers(data);
      setFiltered(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Safe Search (FIXED ERROR)
  useEffect(() => {
    const keyword = search.toLowerCase();

    const result = users.filter((u) =>
      (u.name || "").toLowerCase().includes(keyword) ||
      (u.email || "").toLowerCase().includes(keyword)
    );

    setFiltered(result);
  }, [search, users]);

  // ✏️ Edit user
  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
    setOpen(true);
  };

  // ❌ Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // 💾 Save update
  const handleSave = async () => {
    await fetch(`/api/users/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setOpen(false);
    setEditId(null);
    fetchUsers();
  };

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        User Management
      </Typography>

      {/* 🔍 Search */}
      <Box mb={2}>
        <TextField
          
          label="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* 📊 Table */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name || "N/A"}</TableCell>
                    <TableCell>{user.email || "N/A"}</TableCell>
                    <TableCell>{user.role || "user"}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(user)}>Edit</Button>
                      <Button
                        color="error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* ✏️ Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Edit User</DialogTitle>

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Name"
              value={form.name || ""}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <TextField
              label="Email"
              value={form.email || ""}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            {/* ✅ Role Dropdown */}
            <Select
              value={form.role || "user"}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


