import { asyncHandler } from "@utils/asyncHandler";
import express from "express";
import { authMiddleware } from "middleware/auth.middleware";
import AuthRepository from "repositories/auth.repository";
import ChatRepository from "repositories/chat.repository";
import ChatService from "services/chat.service";


const router = express.Router();

router.use(authMiddleware)

router.get('/', asyncHandler(async (req, res) => {
    const userId = req.user!.userId
    const user = await AuthRepository.findPublicById(userId)
    if (!user) throw new Error('User not found')
    const chats = await ChatService.listUserChats(userId, user!.role)
    res.json({ok: true, data: chats})
}))

router.get('/:chatId/messages', asyncHandler(async (req, res) => {
    const chatId = parseInt(req.params.chatId as string)
    const isUserParticipant = await ChatRepository.findParticipant(chatId, req.user!.userId)
    if (!isUserParticipant) throw new Error('User is not a participant of this chat')
    const messages = await ChatService.listMessages(chatId)
    res.json({ok: true, data: messages})
}))

export default router;
