"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_route_1 = require("../modules/project/project.route");
const document_route_1 = __importDefault(require("../modules/document/document.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const feedback_route_1 = __importDefault(require("../modules/feedback/feedback.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.default,
    },
    {
        path: "/project",
        route: project_route_1.ProjectRoutes,
    },
    {
        path: "/document",
        route: document_route_1.default,
    },
    {
        path: "/feedback",
        route: feedback_route_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
