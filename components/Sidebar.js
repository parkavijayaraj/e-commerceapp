"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useRouter } from "next/navigation";

const drawerWidth = 220;

export default function Sidebar({ children }) {
  const router = useRouter();

  const menu = [
    { text: "Overview", icon: <DashboardIcon />, path: "/overview" },
    { text: "Orders", icon: <ShoppingCartIcon />, path: "/orders" },
    { text: "Products", icon: <InventoryIcon />, path: "/products" },
  ];

  const settings = [
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            MyShop
          </Typography>
        </Box>

        <Divider />

        {/* Menu */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 1 }}>
          <List>
            {menu.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: "8px",
                  mx: 1,
                  my: 0.5,
                  backgroundColor:
                    router.pathname === item.path ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>

          {/* Settings Section */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" color="text.secondary" sx={{ px: 2 }}>
            SETTINGS
          </Typography>
          <List>
            {settings.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: "8px",
                  mx: 1,
                  my: 0.5,
                  backgroundColor:
                    router.pathname === item.path ? "#e3f2fd" : "transparent",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Logout pinned at bottom */}
        <Box sx={{ p: 2, mt: "auto" }}>
          <List>
            <ListItemButton
              onClick={() => router.push("/login")}
              sx={{
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#ffebee" },
              }}
            >
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
