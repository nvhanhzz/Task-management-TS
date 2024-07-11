import { Response } from 'express';
import jwt from "jsonwebtoken";

const generateToken = (res: Response, userId: string, exp: number, tokenName: string): void => {
    const payload = { id: userId };
    const token = jwt.sign(payload, process.env.JWT_SIGNATURE, { expiresIn: exp });

    res.cookie(tokenName, token, {
        httpOnly: true,
        //        secure: !isDevelopment, Chỉ thiết lập secure khi không ở môi trường phát triển
        sameSite: 'strict',
        maxAge: exp * 1000
    });
}

export default generateToken;