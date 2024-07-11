import express, { Router } from "express";
import * as controller from "../controllers/user.controller";
import * as validate from '../validate/user.validate';
import { isLoggedIn } from "../middlewares/auth";

const router: Router = express.Router();



export const taskRoutes: Router = router;