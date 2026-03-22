"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TopNavbar() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: "220px",
        width: "calc(100% - 220px)",
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        color: "#000",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
       

        {/* CENTER SEARCH */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 0.5,
            width: 350,
            borderRadius: 3,
            border: "1px solid #e0e0e0",
          }}
        >
          <SearchIcon sx={{ color: "gray", mr: 1 }} />
          <InputBase placeholder="Search anything..." fullWidth />
        </Paper>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          <IconButton>
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton>
            <SettingsIcon />
          </IconButton>

          <Box
            onClick={handleOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              px: 1,
              py: 0.5,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>Y</Avatar>
            <Box>
              <Typography fontSize="14px" fontWeight="500">
                Yash
              </Typography>
              <Typography fontSize="12px" color="gray">
                Admin
              </Typography>
            </Box>
          </Box>

          {/* MENU */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}





