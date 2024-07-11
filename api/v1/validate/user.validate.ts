import { NextFunction, Request, Response } from "express";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{6,}$/;

interface RegisterBody {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const register = (req: Request<any, any, RegisterBody>, res: Response, next: NextFunction): Response | void => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (typeof fullName !== 'string') {
        return res.status(400).json({ error: "ValidationError", message: "Full name must be a string." });
    }
    if (typeof email !== 'string') {
        return res.status(400).json({ error: "ValidationError", message: "Email must be a string." });
    }
    if (typeof password !== 'string') {
        return res.status(400).json({ error: "ValidationError", message: "Password must be a string." });
    }
    if (typeof confirmPassword !== 'string') {
        return res.status(400).json({ error: "ValidationError", message: "Confirm password must be a string." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "ValidationError", message: "Passwords do not match. Please try again." });
    }
    if (!regex.test(password)) {
        return res.status(400).json({ error: "ValidationError", message: "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &, #)." });
    }

    return next();
}
