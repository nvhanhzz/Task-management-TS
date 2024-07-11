import express, { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as validate from '../validate/user.validate';

const router: Router = express.Router();

router.post("/register", validate.register, controller.register);

router.post("/login", validate.login, controller.login);

router.post("/logout", controller.logout);

export const userRoutes: Router = router;