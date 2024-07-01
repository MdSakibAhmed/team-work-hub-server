import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "socket.io";
import http from "http";
import connectSocket from "./SocketIo/socket";
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://classy-malabi-4cf0a2.netlify.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// connect Socket io

connectSocket(io);

const main = async () => {
  const isConnected = await mongoose.connect(config.database_url as string);
  console.log("connected");
  server.listen(process.env.PORT || 5000, () => {
    console.log(`listenig on ${process.env.PORT || 5000}`);
  });
};

main();
