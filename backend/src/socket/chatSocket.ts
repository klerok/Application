import type { Server, Socket } from "socket.io";
import ChatService from "services/chat.service";

type SocketData = {
  userId?: number;
  activeChatId?: number;
};

type JoinPayload = {
  chatId: number;
};

type SendPayload = {
  chatId: number;
  content: string;
};

type JoinAck = { ok: true } | { ok: false; error: string };
type SendAck = { ok: true } | { ok: false; error: string };

function channelForChat(chatId: number) {
  return `chat:${chatId}`;
}

export function registerChatHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    const data = socket.data as SocketData;

    socket.on(
      "chat:join",
      async (payload: JoinPayload, callback?: (ack: JoinAck) => void) => {
        try {
          const userId = data.userId;
          if (!userId) {
            callback?.({ ok: false, error: "Unauthorized" });
            return;
          }

          const chatId = Number(payload?.chatId);
          if (!Number.isFinite(chatId) || chatId < 1) {
            callback?.({ ok: false, error: "Некорректный чат" });
            return;
          }

          await ChatService.joinRoom({ userId, room: chatId });

          const prev = data.activeChatId;
          if (prev != null && prev !== chatId) {
            socket.leave(channelForChat(prev));
          }

          data.activeChatId = chatId;
          socket.join(channelForChat(chatId));

          const [messages, ticket] = await Promise.all([
            ChatService.getRoomHistory(chatId),
            ChatService.getTicketByChatId(chatId),
          ]);

          socket.emit("chat:history", { chatId, messages, ticket });
          callback?.({ ok: true });
        } catch (e) {
          callback?.({
            ok: false,
            error: e instanceof Error ? e.message : "Unknown error",
          });
        }
      }
    );

    socket.on(
      "chat:message",
      async (payload: SendPayload, callback?: (ack: SendAck) => void) => {
        try {
          if (!data.userId) {
            callback?.({ ok: false, error: "Unauthorized" });
            return;
          }

          const chatId = Number(payload?.chatId);
          if (data.activeChatId !== chatId) {
            callback?.({
              ok: false,
              error: "Сначала выберите это обращение в списке",
            });
            return;
          }

          const message = await ChatService.addUserMessage({
            room: chatId,
            userId: data.userId,
            text: payload.content,
          });
          io.to(channelForChat(chatId)).emit("chat:message", message);
          callback?.({ ok: true });
        } catch (e) {
          callback?.({
            ok: false,
            error: e instanceof Error ? e.message : "Unknown error",
          });
        }
      }
    );

    socket.on("disconnect", () => {
      const id = data.activeChatId;
      if (id != null) {
        socket.leave(channelForChat(id));
      }
      data.activeChatId = undefined;
    });
  });
}
