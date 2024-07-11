import { NextFunction, Request, Response } from "express";

interface taskBody {
    title: string;
    timeStart: string;
    timeFinish: string;
}

export const create = (req: Request<any, any, taskBody>, res: Response, next: NextFunction): Response | void => { // use for create and update
    if (!req.body.title) {
        return res.status(400).json({ "message": "Please provide a title." });
    }
    if (!req.body.timeStart) {
        return res.status(400).json({ "message": "Please provide a start time." });
    }
    if (!req.body.timeFinish) {
        return res.status(400).json({ "message": "Please provide a finish time." });
    }
    return next();
}