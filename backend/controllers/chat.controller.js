import Chat from '../models/chat.model.js';

// Create a new chat
// Find User Chat
// Find Chat

// Create a new chat
const createChat = async (req, res) => {
	const { firstId, secondId } = req.body;

	try {
		const chat = await Chat.findOne({
			members: { $all: [firstId, secondId] },
		});

		if(chat) {
			return res.status(200).json(chat);
		}

		const newChat = new Chat({
			members: [firstId, secondId]
		});

		const response = await newChat.save();

		res.status(201).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

// Find User Chat
const findUserChat = async (req, res) => {
	const { userId } = req.params;

	try {
		const chats = await Chat.find({ members: userId });

		res.status(200).json({ chats });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

// Find Chat
const findChat = async (req, res) => {
	const { firstId, secondId } = req.params;

	try {
		const chat = await Chat.findOne({
			members: { $all: [firstId, secondId] },
		});

		res.status(200).json({ chat });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

export { createChat, findUserChat, findChat };