import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword, comparePassword } from "../../../helper/hashPassword";

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