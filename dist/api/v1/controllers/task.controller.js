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
exports.del = exports.update = exports.create = exports.changeStatus = exports.changeMulti = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const pagination_1 = __importDefault(require("../../../helper/pagination"));
const search_1 = __importDefault(require("../../../helper/search"));
var ListStatus;
(function (ListStatus) {
    ListStatus["INITIAL"] = "initial";
    ListStatus["DOING"] = "doing";
    ListStatus["FINISH"] = "finish";
    ListStatus["PENDING"] = "pending";
    ListStatus["NOT_FINISH"] = "notFinish";
})(ListStatus || (ListStatus = {}));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filter = {
        deleted: false,
        $or: [
            { createdBy: req["currentUser"]._id },
            { participants: req["currentUser"]._id }
        ]
    };
    const sortObject = {};
    const status = req.query.status;
    if (status) {
        if (Object.values(ListStatus).includes(status)) {
            filter["status"] = status;
        }
        else {
            return res.status(400).json({ message: "Invalid status value" });
        }
    }
    const search = (0, search_1.default)(query);
    const regex = search.regex;
    if (regex) {
        filter["title"] = regex;
    }
    const sortKey = query.sortKey;
    const sortValue = query.sortValue;
    if (sortKey && sortValue) {
        const listKey = ["title", "timeStart", "timeFinish"];
        const listValue = ["asc", "desc"];
        if (listKey.includes(sortKey) && listValue.includes(sortValue)) {
            sortObject[sortKey] = sortValue;
        }
        else {
            return res.status(400).json({ message: "Invalid sort key or sort value" });
        }
    }
    const limit = 3;
    const total = yield task_model_1.default.countDocuments(filter);
    const pagination = (0, pagination_1.default)(query, limit, total);
    const tasks = yield task_model_1.default.find(filter)
        .sort(sortObject)
        .skip(pagination.skip)
        .limit(pagination.limit)
        .populate("parentId", "title")
        .populate("createdBy", "fullName email")
        .populate("participants", "fullName email");
    return res.status(200).json({
        message: "Tasks retrieved successfully",
        tasks: tasks,
        pagination: {
            total: total,
            limit: pagination.limit,
            skip: pagination.skip,
            page: pagination.page,
            totalTask: pagination.total
        }
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield task_model_1.default.findOne({
            _id: taskId,
            deleted: false,
            $or: [
                { createdBy: req["currentUser"]._id },
                { participants: req["currentUser"]._id }
            ]
        })
            .populate("parentId", "title")
            .populate("createdBy", "fullName email")
            .populate("participants", "fullName email");
        if (task) {
            return res.status(200).json({
                message: "Task retrieved successfully",
                task: task
            });
        }
        else {
            return res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.detail = detail;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids, key, value } = req.body;
        switch (key) {
            case "status":
                if (!Object.values(ListStatus).includes(value)) {
                    return res.status(400).json({ message: "Invalid status value" });
                }
                const update = yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                    deleted: false,
                    $or: [
                        { createdBy: req["currentUser"]._id },
                        { participants: req["currentUser"]._id }
                    ]
                }, {
                    status: value
                });
                if (update.modifiedCount > 0) {
                    return res.status(200).json({ message: "Status updated successfully" });
                }
                else {
                    return res.status(404).json({ message: "Tasks not found or status not modified" });
                }
            case "delete":
                if (value !== "true") {
                    return res.status(400).json({ message: "Invalid delete value" });
                }
                const del = yield task_model_1.default.updateMany({
                    _id: { $in: ids },
                    deleted: false,
                    $or: [
                        { createdBy: req["currentUser"]._id },
                        { participants: req["currentUser"]._id }
                    ]
                }, {
                    deleted: true,
                    deletedAt: Date.now()
                });
                if (del.modifiedCount > 0) {
                    return res.status(200).json({ message: "Tasks deleted successfully" });
                }
                else {
                    return res.status(404).json({ message: "Tasks not found or already deleted" });
                }
            default:
                return res.status(400).json({ message: "Invalid key" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.changeMulti = changeMulti;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        console.log(Object.values(ListStatus));
        if (!Object.values(ListStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const update = yield task_model_1.default.updateOne({
            _id: id,
            deleted: false,
            $or: [
                { createdBy: req["currentUser"]._id },
                { participants: req["currentUser"]._id }
            ]
        }, {
            status: status
        });
        if (update.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found or status not modified" });
        }
        else {
            return res.status(200).json({ message: "Status updated successfully" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.changeStatus = changeStatus;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!Object.values(ListStatus).includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        req.body.timeStart = new Date(req.body.timeStart);
        req.body.timeFinish = new Date(req.body.timeFinish);
        req.body.createdBy = req["currentUser"]._id;
        const task = new task_model_1.default(req.body);
        const create = yield task.save();
        if (create) {
            return res.status(200).json({ message: "Task created successfully" });
        }
        else {
            return res.status(500).json({ message: "Failed to create task" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!Object.values(ListStatus).includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        req.body.timeStart = new Date(req.body.timeStart);
        req.body.timeFinish = new Date(req.body.timeFinish);
        const update = yield task_model_1.default.updateOne({
            _id: id,
            deleted: false,
            $or: [
                { createdBy: req["currentUser"]._id },
                { participants: req["currentUser"]._id }
            ]
        }, req.body);
        if (update.modifiedCount > 0) {
            return res.status(200).json({ message: "Task updated successfully" });
        }
        else {
            return res.status(404).json({ message: "Task not found or status not modified" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.update = update;
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const update = yield task_model_1.default.updateOne({
            _id: id,
            deleted: false,
            $or: [
                { createdBy: req["currentUser"]._id },
                { participants: req["currentUser"]._id }
            ]
        }, {
            deleted: true,
            deletedAt: Date.now()
        });
        if (update.modifiedCount > 0) {
            return res.status(200).json({ message: "Task marked as deleted" });
        }
        else {
            return res.status(404).json({ message: "Task not found or already deleted" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.del = del;
