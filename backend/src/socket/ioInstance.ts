import type { Server } from "socket.io";

let ioRef: Server | null = null;

export function attachSocketIO(server: Server) {
  ioRef = server;
}

export function getSocketIO(): Server | null {
  return ioRef;
}
