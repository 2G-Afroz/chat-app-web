import express from "express";
import {
  createMessage,
  getMessages,
  updateMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessage);

router.get("/:chatId", getMessages);

router.put("/", updateMessages);

export default router;
