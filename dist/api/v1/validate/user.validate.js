"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{6,}$/;
const register = (req, res, next) => {
    const { fullName, email, password, confirmPassword } = req.body;
    if (typeof fullName !== 'string' || !fullName) {
        return res.status(400).json({ error: "ValidationError", message: "Full name must be a string." });
    }
    if (typeof email !== 'string' || !email) {
        return res.status(400).json({ error: "ValidationError", message: "Email must be a string." });
    }
    if (typeof password !== 'string' || !password) {
        return res.status(400).json({ error: "ValidationError", message: "Password must be a string." });
    }
    if (typeof confirmPassword !== 'string' || !confirmPassword) {
        return res.status(400).json({ error: "ValidationError", message: "Confirm password must be a string." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "ValidationError", message: "Passwords do not match. Please try again." });
    }
    if (!regex.test(password)) {
        return res.status(400).json({ error: "ValidationError", message: "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &, #)." });
    }
    return next();
};
exports.register = register;
const login = (req, res, next) => {
    const { email, password } = req.body;
    if (typeof email !== 'string' || !email) {
        return res.status(400).json({ error: "ValidationError", message: "Email must be a string." });
    }
    if (typeof password !== 'string' || !password) {
        return res.status(400).json({ error: "ValidationError", message: "Password must be a string." });
    }
    return next();
};
exports.login = login;
