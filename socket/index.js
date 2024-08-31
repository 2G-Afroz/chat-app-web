import { Server } from "socket.io";

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("addNewUser", (userId) => {
		!onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId: socket.id });
		io.emit("onlineUsers", onlineUsers);
  });

	socket.on("sendMessage", (message) => {
		const { recipientSocketId, ...rest } = message;
		io.to(message.recipientSocketId).emit("getMessage", rest);
	});

	socket.on("disconnect", () => {
		onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
		io.emit("onlineUsers", onlineUsers);
	});
});

io.listen(4000);
