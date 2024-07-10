import { Application } from "express";
import { userRoutes } from "./user.route";

const route = (app: Application) => {
    const prefix = "/api/v1";
    // app.use(authMiddleware.checkToken({ tokenName: 'token', type: 'currentUser' }));

    // app.use(prefix + "/task", authMiddleware.isLoggedIn, taskRoutes);
    app.use(prefix + "/user", userRoutes);
}

export default route;