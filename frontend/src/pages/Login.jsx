import { Alert, Box, Button, Container, Grid, Grid2, TextField, Typography } from '@mui/material'
import React from 'react'

export default function Login() {
	return (
		<Container maxWidth="sm">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 8,
				}}
			>
				<Typography variant="h4" component="h1">
					Login
				</Typography>
				<Box sx={{ mt: 2 }} component="form">
					<Grid2 container spacing={2} direction="column">
						<Grid2>
							<TextField
								type='email'
								label="Email"
								variant="outlined"
								fullWidth
								required
								autoFocus
							/>
						</Grid2>
						<Grid2>
							<TextField
								type='password'
								label="Password"
								variant="outlined"
								fullWidth
								required
							/>
						</Grid2>
					</Grid2>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ mt: 2 }}
						fullWidth
					>
						Login
					</Button>
				</Box>
				<Alert severity="error" sx={{ mt: 2}}>
					Invalid email or password
				</Alert>
			</Box>
		</Container>
	)
}
