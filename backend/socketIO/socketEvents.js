const setupSocketEvents = (io) => {
  // Online users
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

    socket.on("sendCreateChat", (data) => {
      io.to(data.recipientSocketId).emit("getCreateChat", data.chat);
    });

    socket.on("sendNotification", (notification) => {
      const { recipientSocketId, ...notifi } = notification;
      io.to(recipientSocketId).emit("getNotification", notifi);
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit("onlineUsers", onlineUsers);
    });
  });
};

export default setupSocketEvents;
