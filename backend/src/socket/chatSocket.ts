import type { Server, Socket } from "socket.io";
import ChatService from "services/chat.service";

type SocketData = {
  userId?: number;
};

type JoinPayload = {
  chatId: number;
};

type SendPayload = {
  chatId: number;
  content: string;
};

export function registerChatHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    const data = socket.data as SocketData;

    socket.on(
      "chat:join",
      async (payload: JoinPayload, ack?: (res: any) => void) => {
        try {
            const userId = socket.data.userId
          if (!userId) {
            throw new Error("Unauthorized");
          }
          const result = await ChatService.joinChat({
            userId,
            chatId: payload.chatId,
          });
          socket.join(`chat:${payload.chatId}`);
          socket.emit("chat:joined", result);
          ack?.({ ok: true });
        } catch (e) {
          ack?.({
            ok: false,
            error: e instanceof Error ? e.message : "Unknown error",
          });
        }
      }
    );

    socket.on(
      "chat:message",
      async (payload: SendPayload, ack?: (res: any) => void) => {
        try {
          if (!data.userId) {
            throw new Error("Unauthorized");
          }
          const message = await ChatService.sendMessage({
            userId: data.userId!,
            chatId: payload.chatId,
            content: payload.content,
          });
          io.to(`chat:${payload.chatId}`).emit("chat:message", message);
          ack?.({ ok: true });
        } catch (e) {
          ack?.({
            ok: false,
            error: e instanceof Error ? e.message : "Unknown error",
          });
        }
      }
    );
  });
}
