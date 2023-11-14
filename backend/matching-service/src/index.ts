import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import "./database/db";
import matchHandler from "./handlers/matchHandler";
import { UserModel } from "./models/userModel";
import { getQuestionsByDifficulty } from "./services/questionService";
import { DIFFICULTY } from "./utils/enums";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Hello, from Matching Service!");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export type InputOutput = typeof io;
io.on("connection", async (socket: Socket) => {
  await UserModel.create({
    socketId: socket.id,
    isMatched: false,
  });

  // events and their handlers
  socket.on("matchStart", (data) => matchHandler.matchStart(socket, data));
  socket.on("prematureLeave", () => matchHandler.prematureLeave(socket, io));
  socket.on("properLeave", (data) => matchHandler.properLeave(socket, data));
  socket.on("exitQueue", () => matchHandler.exitQueue(socket));
  socket.on("disconnect", () => matchHandler.disconnect(socket, io));
});

const port = process.env.PORT || 8002;
server.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
