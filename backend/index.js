import express from 'express';
import cors from 'cors';

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Start server
app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});