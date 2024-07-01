import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Document } from "../app/modules/document/document.model";

const connectSocket = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
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
};

export default connectSocket