import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Register() {
  const [formData, setFormData] = React.useState({});
	const [err, setErr] = React.useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
		setErr(null);
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

			if(res.ok) {
				const resData = await res.json();
				console.log(resData);
				setErr(null);
			} else {
				const resData = await res.json();
				setErr(resData.message);
				return;
			}

    } catch (error) {
			setErr(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}>
        <Typography variant="h5" component="h1">
          Register
        </Typography>
        <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
          <Grid2 container spacing={2} direction="column">
            <Grid2>
              <TextField
                id="name"
                type="text"
                autoComplete="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                autoFocus
                onChange={handleChange}
              />
            </Grid2>
            <Grid2>
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid2>
            <Grid2>
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth>
            Register
          </Button>
        </Box>
				{ err ? <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert> : null }
      </Box>
    </Container>
  );
}
