import { Application } from "express";
import { userRoutes } from "./user.route";
import { taskRoutes } from "./task.route";
import { checkToken, isLoggedIn } from "../middlewares/auth";

const route = (app: Application) => {
    const prefix = "/api/v1";
    app.use(checkToken({ tokenName: 'token', type: 'currentUser' }));

    app.use(prefix + "/task", isLoggedIn, taskRoutes);
    app.use(prefix + "/user", userRoutes);
}

export default route;