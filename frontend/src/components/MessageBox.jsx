import React from "react";
import { Box, Typography } from "@mui/material";

export default function MessageBox({ message, timestamp, sender }) {
  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: sender === "me" ? "flex-end" : "flex-start",
				padding: "2px",
      }}>
      <Box
        sx={{
          padding: "4px", // Add some padding
          border: "1px solid #ccc", // Optional: Add a border
          borderRadius: 1, // Optional: Add rounded corners
          overflowWrap: "break-word", // Ensures the text wraps within the box
          backgroundColor: "#f5f5f5", // Optional: Add background color
          maxWidth: "100%", // Allow the box to resize based on text
          display: "inline-block", // Ensure the box fits the content
        }}>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
}
