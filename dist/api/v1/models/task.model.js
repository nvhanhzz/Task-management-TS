"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    content: { type: String, required: true },
    timeStart: { type: Date, required: true },
    timeFinish: { type: Date, required: true },
    parentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Task' },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date }
}, { timestamps: true });
const Task = mongoose_1.default.model("Task", taskSchema, "tasks");
exports.default = Task;
