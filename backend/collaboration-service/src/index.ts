import axios from "axios";
import cors from "cors";
import express, { Express } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app: Express = express();
app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello world from collaboration service!");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

type ISocket = Socket & {
  roomId?: string;
};

export type InputOutput = typeof io;
io.use((socket: ISocket, next) => {
  const roomId = socket.handshake.auth.roomId;
  if (!roomId) return;
  socket.roomId = roomId;
  next();
});

io.on("connection", async (socket: ISocket) => {
  const roomId = socket.roomId!;
  socket.join(roomId);

  socket.on("editorChange", (event) => {
    socket.to(roomId).emit("editorChange", event);
  });
});

const port = process.env.PORT || 8004;
server.listen(port, () => {
  console.log(`Collaboration service is running on port ${port}!`);
});
