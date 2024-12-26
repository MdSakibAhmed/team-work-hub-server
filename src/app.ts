import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();
const corsConfig = {
  origin: ["http://localhost:5173", "https://classy-malabi-4cf0a2.netlify.app"],
  credentials: true,
};

app.use(cors(corsConfig));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// Routing
app.use("/api", router);

app.use(globalErrorHandler);

export default app;
