import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword, comparePassword } from "../../../helper/hashPassword";
import generateToken from "../../../helper/generateToken";

// [POST] /api/v1/user/register
export const register = async (req: Request, res: Response): Promise<Response> => {
    const existUser = await User.findOne({
        email: req.body.email
    });
    if (existUser) {
        return res.status(409).json({ "message": "Email already in use. Please use a different email address." });
    }

    req.body.password = await hashPassword(req.body.password);

    const newUser = new User(req.body);
    const register = await newUser.save();
    if (!register) {
        return res.status(500).json({ "message": "Registration failed. Please try again later." });
    }

    return res.status(200).json({ "message": "Registration successful." });
}

// [POST] /api/v1/user/login
export const login = async (req: Request, res: Response): Promise<Response> => {
    const TOKEN_EXP: number = parseInt(process.env.TOKEN_EXP, 10);
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    });
    if (!user) {
        return res.status(404).json({ "message": 'Email not found or invalid credentials.' });
    }

    const confirm = await comparePassword(req.body.password, user.password.toString());
    if (!confirm) {
        return res.status(401).json({ message: 'Incorrect password.' });
    }

    generateToken(res, user.id, TOKEN_EXP, "token");

    return res.status(200).json({ message: 'Login successful.' });
}

// [POST] /api/v1/user/logout
export const logout = (req: Request, res: Response): Response => {
    res.clearCookie("token");
    return res.status(200).json({ message: 'Logout successful.' });
}

// [GET] /api/v1/user/information
export const information = async (req: Request, res: Response): Promise<Response> => {
    const currentUser = req["currentUser"];

    return res.status(200).json({
        message: "Information retrieved successfully",
        information: {
            _id: currentUser._id,
            fullName: currentUser.fullName,
            email: currentUser.email
        }
    });
}

// [GET] /api/v1/user/list
export const listUser = async (req: Request, res: Response): Promise<Response> => {
    const users = await User.find({
        deleted: false
    }).select("fullName email");

    return res.status(200).json({
        message: "List user retrieved successfully",
        users: users
    });
}