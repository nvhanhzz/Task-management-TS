import express, { Router } from "express";
import * as controller from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/", controller.index);

export const userRoutes: Router = router;