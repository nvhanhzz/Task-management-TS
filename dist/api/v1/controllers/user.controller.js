"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUser = exports.information = exports.logout = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const hashPassword_1 = require("../../../helper/hashPassword");
const generateToken_1 = __importDefault(require("../../../helper/generateToken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_model_1.default.findOne({
        email: req.body.email
    });
    if (existUser) {
        return res.status(409).json({ "message": "Email already in use. Please use a different email address." });
    }
    req.body.password = yield (0, hashPassword_1.hashPassword)(req.body.password);
    const newUser = new user_model_1.default(req.body);
    const register = yield newUser.save();
    if (!register) {
        return res.status(500).json({ "message": "Registration failed. Please try again later." });
    }
    return res.status(200).json({ "message": "Registration successful." });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TOKEN_EXP = parseInt(process.env.TOKEN_EXP, 10);
    const user = yield user_model_1.default.findOne({
        email: req.body.email,
        deleted: false
    });
    if (!user) {
        return res.status(404).json({ "message": 'Email not found or invalid credentials.' });
    }
    const confirm = yield (0, hashPassword_1.comparePassword)(req.body.password, user.password.toString());
    if (!confirm) {
        return res.status(401).json({ message: 'Incorrect password.' });
    }
    (0, generateToken_1.default)(res, user.id, TOKEN_EXP, "token");
    return res.status(200).json({ message: 'Login successful.' });
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: 'Logout successful.' });
};
exports.logout = logout;
const information = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req["currentUser"];
    return res.status(200).json({
        message: "Information retrieved successfully",
        information: {
            _id: currentUser._id,
            fullName: currentUser.fullName,
            email: currentUser.email
        }
    });
});
exports.information = information;
const listUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({
        deleted: false
    }).select("fullName email");
    return res.status(200).json({
        message: "List user retrieved successfully",
        users: users
    });
});
exports.listUser = listUser;
