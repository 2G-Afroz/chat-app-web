import React, { useEffect, useState } from "react";
import {
  getChatsStart,
  getChatsSuccess,
  getChatsFail,
	setCurrentChat,
} from "../redux/user/chatSlice";
import {
	getMessagesStart,
	getMessagesSuccess,
	getMessagesFail,
}	from "../redux/user/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import UserChat from "../components/UserChat";
import {
  Box,
  TextField,
  Typography,
  Paper,
  List,
  Button,
  Badge,
  Chip,
  Grid2,
} from "@mui/material";
import PotentialChat from "../components/PotentialChat";
import ChatBox from "../components/ChatBox";

export default function Chat() {
  const chats = useSelector((state) => state.chat.chats);
  const currentUser = useSelector((state) => state.user.currentUser);
	const currentChat = useSelector((state) => state.chat.currentChat);
	const messages = useSelector((state) => state.message.messages);
  const [potentialUsers, setPotentialUsers] = useState([]);
  const dispatch = useDispatch();

  // To get All Chats
  useEffect(() => {
    const getChats = async () => {
      const userId = currentUser._id;
      try {
        dispatch(getChatsStart());
        const res = await fetch(`/api/chats/${userId}`);

        if (res.ok) {
          const data = await res.json();
          dispatch(getChatsSuccess(data.chats));
        } else {
          dispatch(getChatsFail());
        }
      } catch (err) {
        dispatch(getChatsFail());
      }
    };
    getChats();
  }, []);

	// To get Potential Users
  useEffect(() => {
    const getPotentialUsers = async () => {
      try {
        const res = await fetch("/api/user/find");

        if (!res.ok) {
          return console.error("Failed to fetch potential users");
        }

        const data = await res.json();
        const pUsers = data.filter((u) => {
          let isChatCreated = false;

          if (currentUser._id === u._id) {
            return false;
          }
          if (chats) {
            isChatCreated = chats?.some((chat) => {
              return chat.members.includes(u._id);
            });
          }
          return !isChatCreated;
        });

        setPotentialUsers(pUsers);
      } catch (err) {
        console.error(err);
      }
    };
    getPotentialUsers();
  }, [chats]);

	// To load Chat
	useEffect(() => {
		const loadChat = async () => {
			if(currentChat) {
				try {
					dispatch(getMessagesStart());
					const res = await fetch('/api/messages/' + currentChat._id);
					if (res.ok) {
						const data = await res.json();
						dispatch(getMessagesSuccess(data.messages));
					} else {
						dispatch(getMessagesFail());
					}
				} catch (err) {
					dispatch(getMessagesFail());
					console.error(err);
				}
			}
		};
		loadChat();
	}, [currentChat]);

	const handleChatClick = (chat) => {
		console.log(chat);
		dispatch(setCurrentChat(chat));
	}

  return (
    <Box sx={{ display: "flex", height: "89.5vh", mt: 1 }}>
      {/* Left Sidebar - Users List */}
      <Paper sx={{ width: "300px", padding: 2, boxShadow: 3 }}>
        {/* Potential Users */}
        <Grid2 container gap={"3px"}>
          {potentialUsers?.map((user) => (
            <PotentialChat key={user._id} user={user} />
          ))}
        </Grid2>
        {/* Chat Users */}
        <List sx={{ width: "100%", gap: 1 }}>
          {chats?.map((chat) => (
            <Box
							onClick={() => handleChatClick(chat)}
              key={chat._id}
              sx={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
              <UserChat chat={chat} />
            </Box>
          ))}
        </List>
      </Paper>

      {/* Right Side - Chat Section */}
      <Box
        sx={{
          flexGrow: 1,
          paddingLeft: 1,
          display: "flex",
          flexDirection: "column",
        }}>
				{/* Chat Box */}
				<ChatBox messages={messages}/>
        {/* Chat Input */}
        <Box sx={{ display: "flex", marginTop: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            sx={{ marginRight: 1 }}
          />
          <Button variant="contained">Send</Button>
        </Box>
      </Box>
    </Box>
  );
}
