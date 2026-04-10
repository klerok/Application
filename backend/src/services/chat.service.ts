import { ParticipantRole, UserRole } from "generated/prisma";
import AuthRepository from "repositories/auth.repository";
import ChatRepository from "repositories/chat.repository";

interface JoinChatInput {
  userId: number;
  chatId: number;
}
interface SendMessageInput {
  userId: number;
  chatId: number;
  content: string;
}

class ChatService {
  static async joinChat(input: JoinChatInput) {
    const { userId, chatId } = input;
    const chat = await ChatRepository.findConversationById(chatId);
    if (!chat) throw new Error("Chat not found");
    const user = await AuthRepository.findPublicById(userId);
    if (!user) throw new Error("User not found");

    const roleInChat =
      user.role === UserRole.SUPPORT_AGENT
        ? ParticipantRole.SUPPORT_AGENT
        : ParticipantRole.CUSTOMER;

    const participant = await ChatRepository.findParticipant(chatId, userId);
    if (!participant) {
      await ChatRepository.addParticipant(chatId, userId, roleInChat);
      return { success: true, message: "User joined chat successfully" };
    }

    return { success: true, message: "User already in chat" };
  }

  static async sendMessage(input: SendMessageInput) {
    const content = input.content.trim();
    if (!content) throw new Error("Empty message");
    if (content.length > 2000) throw new Error("Message too long");
    const chat = await ChatRepository.findConversationById(input.chatId);
    if (!chat) throw new Error("Chat not found");
    const participant = await ChatRepository.findParticipant(
      chat.chatId,
      input.userId
    );
    if (!participant) throw new Error("User is not a participant of this chat");
    const message = await ChatRepository.createMessage(
      chat.chatId,
      input.userId,
      content
    );
    await ChatRepository.updateLastMessageAt(chat.chatId, new Date());
    return message;
  }

  static async listUserChats(userId: number, role: UserRole) {
    return ChatRepository.listConversationsForUser(userId, role);
  }

  static async listMessages(chatId: number, take = 50) {
    return ChatRepository.listMessages(chatId, take);
  }
}

export default ChatService;
