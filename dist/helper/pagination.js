"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination = (query, limit, total) => {
    const page = parseInt(query.page || "1", 10);
    const skip = (page - 1) * limit;
    const final = Math.ceil(total / limit);
    const result = {
        page: page,
        skip: skip,
        limit: limit,
        total: total,
        final: final
    };
    return result;
};
exports.default = pagination;
