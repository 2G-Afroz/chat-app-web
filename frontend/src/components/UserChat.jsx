import { Avatar, Box, Grid2, ListItem, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { blue, grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function UserChat({ chat, onlineUsers, notifications}) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [otherUser, setOtherUser] = useState("");

  // Get unreaded notification
  function getUnreadedNoti(nfs) {
    return nfs.filter((n) => {
      return !n.isRead;
    });
  }

  // Get time of the last message
  function formatTime(dateString) {
    // Check if the dateString is valid
    if (!dateString) return '';

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) return '';

    // Get hours and minutes from the date object
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Pad single digit hours and minutes with leading zero
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    // Return the formatted time
    return `${hours}:${minutes}`;
  }


  // Get the other user in the chat
  const otherUserId = chat.members.find(
    (memberId) => memberId !== currentUser._id
  );
  useEffect(() => {
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
          Last Message
        </Typography>
      </Grid2>

      {/* Date and unread message count */}
      <Grid2 container direction="column" alignItems="flex-end">
        <Typography variant="caption" color="text.secondary">
          { formatTime(notifications?.[notifications.length - 1]?.date) }
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: blue[500],
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            visibility: getUnreadedNoti(notifications)?.length ? "visible" : "hidden",
            justifyContent: "center",
          }}>
          <Typography variant="body2" color="white">
            { getUnreadedNoti(notifications)?.length }
          </Typography>
        </Box>
      </Grid2>
    </ListItem>
  );
}
