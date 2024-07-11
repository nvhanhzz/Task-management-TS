"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search = (query) => {
    const keyword = query.keyword;
    const regex = keyword ? new RegExp(keyword, "i") : undefined;
    const res = {};
    if (regex) {
        res.regex = regex;
    }
    return res;
};
exports.default = search;
