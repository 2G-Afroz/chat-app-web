import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import MessageBox from './MessageBox'
import { useSelector } from 'react-redux'

export default function ChatBox({ messages}) {
	const currentUser = useSelector((state) => state.user.currentUser);
	const boxRef = useRef(null);

	useEffect(() => {
		if(boxRef.current) {
			boxRef.current.scrollTop = boxRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<Box
			ref={boxRef}
			sx={{
				flexGrow: 1,
				overflowY: "auto",
				paddingY: 1,
				paddingX: "10px",
				border: "1px solid #ddd",
				borderRadius: 1,
				scrollBehavior: "smooth",
				'&::-webkit-scrollbar': {
					display: 'none',
				},
			}}
		>
			{messages?.map((message) => (
				<MessageBox
					key={message._id}
					message={message.text}
					timestamp={message.createdAt}
					sender={message.senderId === currentUser._id ? "me" : "other"}
				/>
			))}
		</Box>
	)
}
