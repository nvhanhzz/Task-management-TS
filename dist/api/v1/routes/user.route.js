"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("../controllers/user.controller"));
const validate = __importStar(require("../validate/user.validate"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.use((req, res, next) => {
    if (["/logout", "/information", "/list"].includes(req.path)) {
        next();
        return;
    }
    (0, auth_1.isLoggedOut)(req, res, next);
});
router.post("/register", validate.register, controller.register);
router.post("/login", validate.login, controller.login);
router.post("/logout", controller.logout);
router.get("/information", auth_1.isLoggedIn, controller.information);
router.get("/list", auth_1.isLoggedIn, controller.listUser);
exports.userRoutes = router;
