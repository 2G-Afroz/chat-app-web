import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Chat App
          </Typography>
          <Typography variant="body2" component="div" align="center" sx={{ flexGrow: 1, color: "yellow" }}>
						Logged in as Charlee
          </Typography>
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
