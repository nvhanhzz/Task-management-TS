import express, { Router } from "express";
import * as controller from "../controllers/task.controller";
import * as validate from '../validate/task.validate';

const router: Router = express.Router();

router.get("/detail/:id", controller.detail);

router.patch("/change-multi", controller.changeMulti);

router.patch("/change-status/:id", controller.changeStatus);

router.post("/create", validate.create, controller.create);

router.patch("/update/:id", validate.create, controller.update);

router.delete("/delete/:id", controller.del);

router.get("/", controller.index);

export const taskRoutes: Router = router;