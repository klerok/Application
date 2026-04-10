import { asyncHandler } from "@utils/asyncHandler";
import express from "express";
import { authMiddleware } from "middleware/auth.middleware";
import ChatService from "services/chat.service";


const router = express.Router();

router.use(authMiddleware)

router.get('/', asyncHandler(async (req, res) => {
    const userId = req.user!.userId
    const chats = await ChatService.listUserChats(userId)
    res.json({ok: true, data: chats})
}))

router.get('/:chatId/messages', asyncHandler(async (req, res) => {
    const chatId = parseInt(req.params.chatId as string)
    const messages = await ChatService.listMessages(chatId)
    res.json({ok: true, data: messages})
}))

export default router;
