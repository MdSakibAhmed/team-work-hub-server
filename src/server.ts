import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { Server } from "socket.io";
import http from "http";
import connectSocket from "./SocketIo/socket";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { DataTypeDefaults } from "typeorm/driver/types/DataTypeDefaults";
import { Document } from "./app/modules/document/document.model";
import { Auth } from "./app/modules/auth/auth.model";
import { Feedback } from "./app/modules/feedback/feedback.model";
export const AppDataSource = new DataSource({
  url: config.database_url,
  host: config.db_host,
  type: "postgres",
  username: config.db_username,
  password: config.db_password,
  database: config.db_host,
  entities: [Document, Auth, Feedback],
  synchronize: true,
});

const server = http.createServer(app);

const io = new Server(server, {
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

// connectSocket(io);

const main = async () => {
  // const isConnected = await mongoose.connect(config.database_url as string);
  // console.log("connected");
  // server.listen(process.env.PORT || 5000, () => {
  //   console.log(`listenig on ${process.env.PORT || 5000}`);
  // });

  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
};

main();
