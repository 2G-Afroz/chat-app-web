import Message from "../models/message.model.js";

// CreateMessage
const createMessage = async (req, res) => {
	const { chatId, senderId, text } = req.body;

	try {
		const newMessage = new Message({
			chatId,
			senderId,
			text,
		});

		const response = await newMessage.save();

		res.status(201).json({ response });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

// GetMessage
const getMessages = async (req, res) => {
	const { chatId } = req.params;

	try {
		const messages = await Message.find({ chatId });

		res.status(200).json({ messages });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

export { createMessage, getMessages };