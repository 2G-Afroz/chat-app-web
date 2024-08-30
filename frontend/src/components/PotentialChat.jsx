import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getChatsStart,
  getChatsSuccess,
  getChatsFail,
} from "../redux/user/chatSlice";

export default function PotentialChat({ user }) {
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
			dispatch(getChatsSuccess(chats.concat(data.response)));
    } catch (err) {
			//getChatsFail();
      console.error(err);
    }
  };

  return (
    <Button
      variant="outlined"
      style={{ borderRadius: 16 }}
      onClick={handleCreateChat}
    >
      {user.name}
    </Button>
  );
}
