import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import setupSocketEvents from "./socketIO/socketEvents.js";
// importing the user route
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// Initialize express app
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = process.env.PORT || 3000;
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

// Start server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Socket.io
setupSocketEvents(io);
