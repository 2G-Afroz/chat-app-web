import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// importing the user route
import userRoute from './routes/user.route.js';

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
	console.log('Connected to MongoDB');
}).catch((error) => {
	console.log('Error connecting to MongoDB', error);
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/user', userRoute);
app.get('/', (req, res) => {
	res.send('Welcome to the backend!');
});

// Start server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});