import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const user = useSelector((state) => state.user.currentUser);

  console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Chat App
          </Typography>
          <Typography variant="body2" component="div" align="center" sx={{ flexGrow: 1, color: "yellow" }}>
            { user ? `Logged in as ${user.name}` : "" }
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
