import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

// Routing
app.use("/api", router);

app.use(globalErrorHandler);

export default app;
