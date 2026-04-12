const API_BASE = "http://localhost:3000";

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg =
      data.message || data.error || `Запрос не выполнен (${response.status})`;
    throw new Error(typeof msg === "string" ? msg : "Запрос не выполнен");
  }
  return data;
}

export async function fetchChats() {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "GET",
    credentials: "include",
  });
  return parseJsonResponse(response);
}

export async function fetchMessages(chatId) {
  const response = await fetch(`${API_BASE}/api/chat/${chatId}/messages`, {
    method: "GET",
    credentials: "include",
  });
  return parseJsonResponse(response);
}

export async function closeChat(chatId) {
  const response = await fetch(`${API_BASE}/api/chat/${chatId}/close`, {
    method: "POST",
    credentials: "include",
  });
  return parseJsonResponse(response);
}

export async function createTicket({ title, description }) {
  const response = await fetch(`${API_BASE}/api/chat/tickets`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description: description?.trim() ? description.trim() : null,
    }),
  });
  return parseJsonResponse(response);
}

export const SOCKET_URL = API_BASE;
