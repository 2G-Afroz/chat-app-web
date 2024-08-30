import { Avatar, Box, Grid2, ListItem, Typography } from "@mui/material";
import React from "react";
import { blue, grey } from "@mui/material/colors";

export default function UserChat() {
  return (
    <ListItem
      sx={{ mb: "2px", p: "8px", borderRadius: 1, border: 1, borderColor: `${grey[300]}` }}>
      {/* Avatar and the online status */}
      <Box sx={{ position: "relative", marginRight: 2 }}>
        <Avatar />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "green",
            border: "2px solid white",
          }}
        />
      </Box>

      {/* User name and the recent message */}
      <Grid2 container direction="column" sx={{ flexGrow: 1 }}>
        <Typography variant="body1" component="div">
          User Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recent Message
        </Typography>
      </Grid2>

      {/* Date and unread message count */}
      <Grid2 container direction="column" alignItems="flex-end">
        <Typography variant="caption" color="text.secondary">
          12:00 PM
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: blue[500],
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            justifyContent: "center",
          }}>
          <Typography variant="body2" color="white">
            2
          </Typography>
        </Box>
      </Grid2>
    </ListItem>
  );
}
