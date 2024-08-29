import { Alert, Box, Button, Container, Grid, Grid2, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { registerStart, registerSuccess, registerFail } from "../redux/user/userSlice";

export default function Login() {
	const user = useSelector((state) => state.user.currentUser);
	const [formData, setFormData] = React.useState({});
	const [err, setErr] = React.useState();
	const dispatch = useDispatch();

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
			dispatch(registerStart());
			const res = await fetch("/api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if(res.ok) {
				const resData = await res.json();
				dispatch(registerSuccess(resData));
			} else {
				dispatch(registerFail());
				const resData = await res.json();
				setErr(resData.message);
				return;
			}
		} catch (error) {
			dispatch(registerFail());
			setErr(error);
		}

	};

	if(user) {
		return <Navigate to="/" />
	}

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
				<Typography variant="h5" component="h1">
					Login
				</Typography>
				<Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
					<Grid2 container spacing={2} direction="column">
						<Grid2>
							<TextField
								id='email'
								type='email'
								label="Email"
								variant="outlined"
								fullWidth
								required
								autoFocus
								onChange={handleChange}
							/>
						</Grid2>
						<Grid2>
							<TextField
								id='password'
								type='password'
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
						fullWidth
					>
						Login
					</Button>
				</Box>
				{ err ? <Alert severity="error" sx={{ mt: 2 }}>{err}</Alert> : null }
			</Box>
		</Container>
	)
}