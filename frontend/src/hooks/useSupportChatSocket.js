import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../api/chat";

const CHAT_EVENTS = [
  ["chat:history", "onChatHistory"],
  ["chat:message", "onChatMessage"],
  ["support:ticket-created", "onTicketCreated"],
  ["chat:closed", "onChatClosed"],
];

export function useSupportChatSocket({ enabled, handlers = {} }) {
  const socketRef = useRef(null);
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const [status, setStatus] = useState("disconnected");

  useEffect(() => {
    if (!enabled) return;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;
    setStatus("connecting");

    socket.on("connect", () => setStatus("connected"));
    socket.on("disconnect", () => setStatus("disconnected"));
    socket.on("connect_error", () => setStatus("error"));

    for (const [event, key] of CHAT_EVENTS) {
      socket.on(event, (payload) => handlersRef.current[key]?.(payload));
    }

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      setStatus("disconnected");
    };
  }, [enabled]);

  const joinChat = useCallback((chatId) => {
    const socket = socketRef.current;
    return new Promise((resolve, reject) => {
      if (!socket?.connected) {
        reject(new Error("Нет соединения с чатом"));
        return;
      }
      socket.emit("chat:join", { chatId }, (ack) => {
        if (ack?.ok) resolve();
        else reject(new Error(ack?.error || "Не удалось войти в чат"));
      });
    });
  }, []);

  const sendMessage = useCallback((chatId, content) => {
    const socket = socketRef.current;
    if (!socket?.connected) return;
    socket.emit("chat:message", { chatId, content }, (ack) => {
      if (ack && !ack.ok) console.warn("chat:message", ack.error);
    });
  }, []);

  return { status, joinChat, sendMessage };
}
