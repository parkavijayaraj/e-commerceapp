"use client";

import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ShopLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar (Left) */}
      <Sidebar />

      {/* Right Section */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Navbar (Top) */}
        <Navbar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            py:10,
            px: 4,
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
}