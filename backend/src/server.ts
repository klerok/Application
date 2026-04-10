import 'dotenv/config'
import express, { ErrorRequestHandler } from "express";
import cors from "cors";
// import { pool } from "./db";
import cookieParser from "cookie-parser";
import authRouter from "./api/auth";
import { errorMiddleware } from "middleware/error.middleware";
import { notFoundMiddleware } from "middleware/notFound.middleware";
import http from 'http'
import { Server } from 'socket.io';
import { registerChatHandlers } from 'socket/chatSocket';
import chatRouter from 'api/chat';
import { socketAuthMiddleware } from 'middleware/socketAuth.middleware';
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok!!!!!!" });
});

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
})

io.use(socketAuthMiddleware)
registerChatHandlers(io)

app.use(notFoundMiddleware)
app.use(errorMiddleware as ErrorRequestHandler);

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
