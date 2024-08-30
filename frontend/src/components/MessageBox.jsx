import React from "react";
import { Box, Typography } from "@mui/material";

export default function MessageBox({ message, timestamp, sender }) {
  
	const time = new Date(timestamp);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: sender === "me" ? "flex-end" : "flex-start",
				padding: "2px",
      }}>
      <Box
        sx={{
          padding: "4px",
          border: "1px solid #ccc",
          borderRadius: 1,
          overflowWrap: "break-word",
          backgroundColor: "#f5f5f5",
          maxWidth: "100%",
          display: "inline-block",
        }}>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          {time.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}
