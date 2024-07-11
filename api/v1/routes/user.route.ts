import express, { NextFunction, Request, Response, Router } from "express";
import * as controller from "../controllers/user.controller";
import * as validate from '../validate/user.validate';
import { isLoggedIn, isLoggedOut } from "../middlewares/auth";

const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction): void => {
    if (["/logout", "/information", "/list"].includes(req.path)) {
        next();
        return;
    }
    isLoggedOut(req, res, next);
});

router.post("/register", validate.register, controller.register);

router.post("/login", validate.login, controller.login);

router.post("/logout", controller.logout);

router.get("/information", isLoggedIn, controller.information);

router.get("/list", isLoggedIn, controller.listUser);

export const userRoutes: Router = router;