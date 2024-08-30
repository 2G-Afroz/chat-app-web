import React, { useEffect } from "react";
import {
  getChatsStart,
  getChatsSuccess,
  getChatsFail,
} from "../redux/user/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import UserChat from "../components/UserChat";
import {
  Box,
  TextField,
  Typography,
  Paper,
  List,
	Button,
} from "@mui/material";

export default function Chat() {
  const { chats, loading, error } = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  // Function to get All Chats
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

  return (
    <Box sx={{ display: "flex", height: "89.5vh", mt: 1 }}>
      {/* Left Sidebar - Users List */}
      <Paper sx={{ width: "300px", padding: 2, boxShadow: 3 }}>
				<List sx={{width: "100%", gap: 1}}>
					<UserChat />
					<UserChat />
				</List>
      </Paper>

      {/* Right Side - Chat Section */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography variant="h6" gutterBottom>
          Chat
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
          }}>
          {/* Chat messages */}
          <Typography variant="body1" gutterBottom>
            User 1: Hello!
          </Typography>
          <Typography variant="body1" gutterBottom>
            You: Hi there!
          </Typography>
        </Box>
        {/* Chat Input */}
        <Box sx={{ display: "flex", marginTop: 2 }}>
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
