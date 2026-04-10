import jwt from "jsonwebtoken";
import authConfig from "@config/auth.config";
import type { Socket } from "socket.io";

function getCookieValue(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(";").map((p) => p.trim());
  const entry = parts.find((p) => p.startsWith(`${name}=`));
  if (!entry) return null;

  return decodeURIComponent(entry.slice(name.length + 1));
}

export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
  try {
    const token = getCookieValue(socket.handshake.headers.cookie, "accessToken");
    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, authConfig.secret);
    if (typeof decoded === "string") return next(new Error("Unauthorized"));

    const userId = (decoded as jwt.JwtPayload).userId;
    if (typeof userId !== "number") return next(new Error("Unauthorized"));

    socket.data.userId = userId;
    return next();
  } catch {
    return next(new Error("Unauthorized"));
  }
}