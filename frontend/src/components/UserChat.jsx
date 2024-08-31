import { Avatar, Box, Grid2, ListItem, Typography } from "@mui/material";
import React from "react";
import { blue, grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function UserChat({ chat, onlineUsers }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [otherUser, setOtherUser] = React.useState("KING");

  // Get the other user in the chat
  const otherUserId = chat.members.find(
    (memberId) => memberId !== currentUser._id
  );
  React.useEffect(() => {
    getUser(otherUserId).then((data) => {
      setOtherUser(data);
    });
  }, []);

  // Get the other user's details
  const getUser = async (id) => {
    try {
      const res = await fetch("/api/user/find/" + id);

      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ListItem
      sx={{
        mb: "2px",
        p: "8px",
        borderRadius: 1,
        border: 1,
        borderColor: `${grey[300]}`,
        backgroundColor: currentChat?._id === chat._id ? blue[100] : "white",
      }}>
      {/* Avatar and the online status */}
      <Box sx={{ position: "relative", marginRight: 2 }}>
        <Avatar />
        {onlineUsers.some(
          (onlineUser) => onlineUser.userId === otherUser._id
        ) && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "green",
              border: "2px solid white",
            }}
          />
        )}
      </Box>

      {/* User name and the recent message */}
      <Grid2 container direction="column" sx={{ flexGrow: 1 }}>
        <Typography variant="body1" component="div">
          {otherUser.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recent Message
        </Typography>
      </Grid2>

      {/* Date and unread message count */}
      <Grid2 container direction="column" alignItems="flex-end">
        <Typography variant="caption" color="text.secondary">
          12:00 PM
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: blue[500],
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            justifyContent: "center",
          }}>
          <Typography variant="body2" color="white">
            2
          </Typography>
        </Box>
      </Grid2>
    </ListItem>
  );
}
