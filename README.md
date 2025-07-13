# Chat App

This is a chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and socket.io technology.

## Features

- Real-time messaging using socket.io
- User authentication and authorization
- Message history and notifications
- User profiles and avatars

## Installation

1. Clone the repository: `https://github.com/2G-Afroz/chat-app-web`
2. Install dependencies: `(cd backend && npm install) && (cd frontend && npm install)`
3. Set up environment variables: Create a `.env` file in the backend directory and add the following variables:

   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET_KEY`: Secret key for JWT authentication

4. Start the server: `cd backend && npm start`
5. Start the client: `cd frontend && npm run dev`

## Usage

1. Register a new account or log in with your existing credentials.
2. Create a new chat.
3. Start messaging with other users in real-time.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
