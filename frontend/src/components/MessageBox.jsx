import React from "react";
import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function MessageBox({ message, timestamp, sender }) {
 
  function getTimeDiff(date) {
    const currentDate = new Date();
    const messageDate = new Date(date);

    const diff = currentDate - messageDate;

    if(diff < 60000) {
      return "Just now";
    }
    if(diff < 3600000) {
      return `${Math.floor(diff / 60000)}m ago`;
    }
    if(diff < 86400000) {
      return `${Math.floor(diff / 3600000)}h ago`;
    }
    return `${Math.floor(diff / 86400000)}d ago`;
  }

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
          backgroundColor: sender === "me" ? blue[100] : "#fff",
          maxWidth: "100%",
          display: "inline-block",
          minWidth: "100px",
        }}>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          {getTimeDiff(timestamp)}
        </Typography>
      </Box>
    </Box>
  );
}
