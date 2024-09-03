import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getChatsStart,
  getChatsSuccess,
  getChatsFail,
} from "../redux/user/chatSlice";
import { setCurrentChat } from "../redux/user/chatSlice";

export default function PotentialChat({ user, onlineUsers, socket }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleCreateChat = async () => {
    try {
			//dispatch(getChatsStart());
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstId: currentUser._id,
          secondId: user._id,
        }),
      });

      if (!res.ok) {
				//dispatch(getChatsFail());
        return console.error("Failed to create chat");
      }

			const data = await res.json();
			dispatch(getChatsSuccess(chats.concat(data)));
      dispatch(setCurrentChat(data));

      // Send the chat to the recipient if they are online
      // Get the recipient Id 
      const recipientId = data.members.find(
        (memberId) => memberId !== currentUser._id
      );
      const recipientSocket = onlineUsers?.find(
        (user) => user.userId === recipientId
      );

      socket.emit("sendCreateChat", {
        chat: data,
        recipientSocketId: recipientSocket?.socketId,
      });

    } catch (err) {
			//getChatsFail();
      console.error(err);
    }
  };

  return (
    <Button
      variant="outlined"
      style={{padding: "4px 8px"}}
      onClick={handleCreateChat}
      {...(onlineUsers.some((onlineUser) => onlineUser.userId === user._id) && {
        sx: { backgroundColor: "green", color: "white" },
      })}
    >
      <Avatar sx={{width: "16px", height: "16px"}}/>
      <Typography variant="body2" sx={{mr: "4px", ml: "4px"}}>
        {user.name}
      </Typography>
    </Button>
  );
}
