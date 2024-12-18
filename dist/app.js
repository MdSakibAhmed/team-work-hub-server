"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: ["http://localhost:5173", "https://classy-malabi-4cf0a2.netlify.app"],
    credentials: true,
};
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello world");
});
// Routing
app.use("/api", routes_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
