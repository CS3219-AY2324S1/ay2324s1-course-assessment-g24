import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import "./db";
import { UserModel } from "./model";
import { registerMatchHandler } from "./socketHandler/matchHandler";

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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export type InputOutput = typeof io;
const onConnection = async (socket: Socket) => {
  await UserModel.create({
    socketId: socket.id,
    isMatched: false,
  });
  registerMatchHandler(io, socket);
};

io.on("connection", onConnection);

const port = process.env.PORT || 8002;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

