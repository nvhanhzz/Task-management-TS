"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("./user.route");
const task_route_1 = require("./task.route");
const auth_1 = require("../middlewares/auth");
const route = (app) => {
    const prefix = "/api/v1";
    app.use((0, auth_1.checkToken)({ tokenName: 'token', type: 'currentUser' }));
    app.use(prefix + "/task", auth_1.isLoggedIn, task_route_1.taskRoutes);
    app.use(prefix + "/user", user_route_1.userRoutes);
};
exports.default = route;
