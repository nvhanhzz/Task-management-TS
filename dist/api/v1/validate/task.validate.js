"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const create = (req, res, next) => {
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
};
exports.create = create;
