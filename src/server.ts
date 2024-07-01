import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "socket.io";
import { Document } from "./app/modules/document/document.model";

import http from "http";
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://team-work-hub-client.onrender.com","https://classy-malabi-4cf0a2.netlify.app"], 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Join a document room
  socket.on("joinDocument", async (docId) => {
    socket.join(docId);
    console.log(docId);
    const document = await Document.findById(docId);
    socket.emit("loadDocument", document);
    console.log(document);
    //
    //   Listen for changes and broadcast to the room
    socket.on("sendChanges", (changes) => {
      console.log(changes);
      socket.broadcast.to(docId).emit("receiveChanges", changes);
    });

    // Save document content
    socket.on("saveDocument", async (data) => {
      const newDoc = await Document.findByIdAndUpdate(
        docId,
        {
          content: data.content,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      console.log(newDoc);
    });

    // live chat

    socket.on("message", (data) => {
      console.log("chat", data);
      io.emit("message", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const main = async () => {
  const isConnected = await mongoose.connect(config.database_url as string);
  console.log("connected");
  server.listen(process.env.PORT || 5000, () => {
    console.log("listening ");
  });

};

main();
